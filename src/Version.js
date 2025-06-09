import { checkTypeOrError, isLikeNum } from "./type";
import { gt, lt } from "./number";
import cloneDeep from "lodash/cloneDeep";

/**
 * @description 版本号相关方法
 */
class Version {
  /**
   * @description 构造器
   * @param {String} version 版本号，如1.0.0
   */
  constructor(version) {
    checkTypeOrError(version, "String");
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
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Number} 返回比较结果，若实例版本大于参数版本，返回1；相等，返回0；小于，返回-1
   */
  compare(version) {
    const targVer = version instanceof Version ? version : new Version(version);
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
   * @description 任意比较符号比较
   * @param {String} symbol 比较符号，如>、<、≥、≤、lt、gte等
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若实例版本和参数版本在对应符号意义的比较上成立，返回true，否则返回false
   */
  compareWith(symbol, version) {
    checkTypeOrError(symbol, "String");
    let sym;
    const sarr1 = [">", "<", "=", "≠", "≥", "≤"];
    const sarr2 = ["gt", "lt", "eq", "neq", "gte", "lte"];
    if (sarr1.includes(symbol)) {
      const idx = sarr1.indexOf(symbol);
      sym = sarr2[idx];
    } else if (sarr2.includes(symbol)) {
      sym = symbol;
    }
    if (sym) return this[sym](version);
    return false;
  }
  /**
   * @description 大于
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若实例版本大于参数版本，返回true，否则返回false
   */
  gt(version) {
    return this.compare(version) > 0;
  }
  /**
   * @description 小于
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若实例版本小于参数版本，返回true，否则返回false
   */
  lt(version) {
    return this.compare(version) < 0;
  }
  /**
   * @description 等于
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若实例版本等于参数版本，返回true，否则返回false
   */
  eq(version) {
    return this.compare(version) === 0;
  }
  /**
   * @description 不等于
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若实例版本不等于参数版本，返回true，否则返回false
   */
  neq(version) {
    return this.compare(version) !== 0;
  }
  /**
   * @description 大于等于
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若实例版本大于等于参数版本，返回true，否则返回false
   */
  gte(version) {
    return this.compare(version) >= 0;
  }
  /**
   * @description 小于等于
   * @param {String|Version} version 版本号，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若实例版本小于等于参数版本，返回true，否则返回false
   */
  lte(version) {
    return this.compare(version) <= 0;
  }

  /**
   * @description 比较方法（静态）
   * @param {String|Version} version1 版本号1，如1.0.0或Version实例
   * @param {String|Version} version2 版本号2，如1.0.0或Version实例
   * @returns {Number} 返回比较结果，若版本号1大于版本号2，返回1；相等，返回0；小于，返回-1
   */
  static compare(version1, version2) {
    const ver1 = (version1 =
      version1 instanceof Version ? version1 : new Version(version1));
    return ver1.compare(version2);
  }

  /**
   * @description 任意比较符号比较
   * @param {String|Version} version1 版本号1，如1.0.0或Version实例
   * @param {String} symbol 比较符号，如>、<、>=、lt、gte等
   * @param {String|Version} version2 版本号2，如1.0.0或Version实例
   * @returns {Boolean} 返回比较结果，若版本号1和版本号2在对应符号意义的比较上成立，返回true，否则返回false
   */
  static compareWith(version1, symbol, version2) {
    const ver1 = version1 instanceof Version ? version1 : new Version(version1);
    return ver1.compareWith(symbol, version2);
  }
}

export default Version;
