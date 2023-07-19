import { checkTypeOrError, isStr, isNum, isLikeNum } from "./type";
import { gt, lt } from "./number";
import cloneDeep from "lodash/cloneDeep";

/**
 * @description 版本号处理
 */
class Version {
  constructor(version) {
    checkTypeOrError(version, ["String", "Array"]);
    let str = "",
      arr = [];
    if (isStr(version)) {
      arr = version
        .replace(/[^0-9|\.]/g, "")
        .split(".")
        .filter((_) => isLikeNum(_));
      str = arr.join(".");
    } else {
      arr = version
        .map((_) => {
          if (!(isStr(_) || isNum(_))) return false;
          return (_ + "").replace(/[^0-9]/g, "");
        })
        .filter((_) => _);
      str = arr.join(".");
    }
    this.value = str;
    this.arrayValue = arr;
  }
  // 比较
  compare(version) {
    const that = new Version(version);
    let thisArrayValue = cloneDeep(this.arrayValue);
    const difflen = that.arrayValue.length - thisArrayValue.length;
    if (difflen > 0) {
      thisArrayValue = thisArrayValue.concat(new Array(difflen));
    }
    for (let index = 0; index < thisArrayValue.length; index++) {
      const ver1 = thisArrayValue[index] || 0;
      const ver2 = that.arrayValue[index] || 0;
      if (gt(ver1, ver2)) {
        return 1;
      } else if (lt(ver1, ver2)) {
        return -1;
      }
    }
    return 0;
  }
  // 大于
  gt(version) {
    return this.compare(version) > 0;
  }
  // 小于
  lt(version) {
    return this.compare(version) < 0;
  }
  // 等于
  eq(version) {
    return this.compare(version) === 0;
  }
  // 大于等于
  gte(version) {
    return this.compare(version) >= 0;
  }
  // 小于等于
  lte(version) {
    return this.compare(version) <= 0;
  }
}

export default Version;
