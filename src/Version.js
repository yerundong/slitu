import { isLikeNum, isStr } from "./type";
import { checkRTAOrError } from "./check";
import { gt, lt } from "./number";
import cloneDeep from "lodash/cloneDeep";

/**
 * @description 版本号相关方法
 */
class Version {
  /**
   * @description 构造器
   * @param {string} version 版本号，如1.0.0，必传
   */
  constructor(version) {
    checkRTAOrError(version, "version", true, ["String"]);
    let arr = version
      .replace(/[^0-9|\.]/g, "")
      .split(".")
      .filter((_) => isLikeNum(_));
    let str = arr.join(".");
    this.value = str;
    this.arrayValue = arr;
  }
  /**
   * @description 比较方法
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {number} 返回比较结果，若实例版本大于参数版本，返回1；相等，返回0；小于，返回-1
   */
  compare(version) {
    checkRTAOrError(version, "version", true, [["String", Version]]);
    const targVer = isStr(version) ? new Version(version) : version;
    let thisArrayValue = cloneDeep(this.arrayValue);
    const difflen = targVer.arrayValue.length - thisArrayValue.length;
    if (difflen > 0) {
      thisArrayValue = thisArrayValue.concat(new Array(difflen));
    }
    for (let index = 0; index < thisArrayValue.length; index++) {
      const ver1 = thisArrayValue[index] || 0;
      const ver2 = targVer.arrayValue[index] || 0;
      if (gt(ver1, ver2)) {
        return 1;
      } else if (lt(ver1, ver2)) {
        return -1;
      }
    }
    return 0;
  }
  /**
   * @description 任意符号比较
   * @param {string} symbol 比较符号，如>、<、≥、≤、lt、gte等，必传
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若实例版本和参数版本在对应符号意义的比较上成立，返回true，否则返回false
   */
  compareWith(symbol, version) {
    checkRTAOrError(symbol, "symbol", true, ["String"]);
    checkRTAOrError(version, "version", true, [["String", Version]]);
    let sym;
    const sarr1 = ["gt", "lt", "eq", "neq", "gte", "lte"];
    const sarr2 = [">", "<", "=", ["≠", "!="], ["≥", ">="], ["≤", "<="]];

    if (sarr1.includes(symbol)) {
      sym = symbol;
    } else {
      for (let i = 0, item; (item = sarr2[i]); i++) {
        if (item === symbol || item?.includes(symbol)) {
          sym = sarr1[i];
          break;
        }
      }
    }
    if (sym) return this[sym](version);
    return false;
  }
  /**
   * @description 大于
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若实例版本大于参数版本，返回true，否则返回false
   */
  gt(version) {
    checkRTAOrError(version, "version", true, [["String", Version]]);
    return this.compare(version) > 0;
  }
  /**
   * @description 小于
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若实例版本小于参数版本，返回true，否则返回false
   */
  lt(version) {
    checkRTAOrError(version, "version", true, [["String", Version]]);
    return this.compare(version) < 0;
  }
  /**
   * @description 等于
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若实例版本等于参数版本，返回true，否则返回false
   */
  eq(version) {
    checkRTAOrError(version, "version", true, [["String", Version]]);
    return this.compare(version) === 0;
  }
  /**
   * @description 不等于
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若实例版本不等于参数版本，返回true，否则返回false
   */
  neq(version) {
    checkRTAOrError(version, "version", true, [["String", Version]]);
    return this.compare(version) !== 0;
  }
  /**
   * @description 大于等于
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若实例版本大于等于参数版本，返回true，否则返回false
   */
  gte(version) {
    checkRTAOrError(version, "version", true, [["String", Version]]);
    return this.compare(version) >= 0;
  }
  /**
   * @description 小于等于
   * @param {string|Version} version 版本号，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若实例版本小于等于参数版本，返回true，否则返回false
   */
  lte(version) {
    checkRTAOrError(version, "version", true, [["String", Version]]);
    return this.compare(version) <= 0;
  }
  /**
   * @description 比较方法（静态）
   * @param {string|Version} version1 版本号1，如1.0.0或Version实例，必传
   * @param {string|Version} version2 版本号2，如1.0.0或Version实例，必传
   * @returns {number} 返回比较结果，若版本号1大于版本号2，返回1；相等，返回0；小于，返回-1
   */
  static compare(version1, version2) {
    checkRTAOrError(version1, "version1", true, [["String", Version]]);
    checkRTAOrError(version2, "version2", true, [["String", Version]]);
    const ver1 = (version1 =
      version1 instanceof Version ? version1 : new Version(version1));
    return ver1.compare(version2);
  }
  /**
   * @description 任意比较符号比较
   * @param {string|Version} version1 版本号1，如1.0.0或Version实例，必传
   * @param {string} symbol 比较符号，如>、<、>=、lt、gte等，必传
   * @param {string|Version} version2 版本号2，如1.0.0或Version实例，必传
   * @returns {boolean} 返回比较结果，若版本号1和版本号2在对应符号意义的比较上成立，返回true，否则返回false
   */
  static compareWith(version1, symbol, version2) {
    checkRTAOrError(version1, "version1", true, [["String", Version]]);
    checkRTAOrError(symbol, "symbol", true, ["String"]);
    checkRTAOrError(version2, "version2", true, [["String", Version]]);
    const ver1 = version1 instanceof Version ? version1 : new Version(version1);
    return ver1.compareWith(symbol, version2);
  }
}

export default Version;
