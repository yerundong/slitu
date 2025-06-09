import {
  checkTypeOrError,
  isInTypes,
  isNil,
  isInvalid,
  isVoid,
  isLikeFalse,
  isTypeEqual,
  isUndef,
} from "./type";

/**
 * 睡眠函数
 */
export const sleep = async (time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

/**
 * 判断值为目标值之一，若是，则返回替换值
 *
 */
export const displace = (value, replacement, valueRange = []) => {
  checkTypeOrError(valueRange, "Array");
  return valueRange.includes(value) ? replacement : value;
};

/**
 * 判断值类型为目标类型之一，若是，则返回替换值
 * 注意：
 *  1.expType支持字符串、数组格式
 *  2.expType支持组合类型
 */
export const displaceByType = (value, replacement, expType) => {
  checkTypeOrError(expType, ["String", "Array"]);
  return isInTypes(value, expType) ? replacement : value;
};

/**
 * 常用无效值替换
 */
export const displaceNil = (value, replacement) => {
  return isNil(value) ? replacement : value;
};
export const displaceInvalid = (value, replacement) => {
  return isInvalid(value) ? replacement : value;
};
export const displaceVoid = (value, replacement) => {
  return isVoid(value) ? replacement : value;
};
export const displaceLikeFalse = (value, replacement) => {
  return isLikeFalse(value) ? replacement : value;
};

/**
 ** @description 安全的JSON.parse
 ** @param {Any} value 需要处理的数据
 ** @param {Any} defRetValue JSON.parse执行报错时，或者JSON.parse执行后的数据类型与defRetValue类型不一致，则返回defRetValue
 */
export const safeJsonParse = (value, defRetValue) => {
  let reVal;
  if (isInTypes(value, ["Object", "Array"])) {
    reVal = value;
  } else {
    try {
      reVal = JSON.parse(value);
    } catch {}
  }

  if (isUndef(defRetValue)) {
    return reVal;
  } else {
    if (!isTypeEqual(reVal, defRetValue)) {
      return defRetValue;
    } else {
      return reVal;
    }
  }
};
