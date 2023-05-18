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
 */
export const displaceByType = (value, replacement, typeRange = []) => {
  checkTypeOrError(typeRange, "Array");
  return isInTypes(value, typeRange) ? replacement : value;
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
 * 安全的JSON.parse
 */
export const safeJsonParse = (value, defValue) => {
  let reVal;
  try {
    reVal = JSON.parse(value);
  } catch {}

  if (isUndef(defValue)) {
    return reVal;
  } else {
    if (!isTypeEqual(reVal, defValue)) {
      return defValue;
    } else {
      return reVal;
    }
  }
};
