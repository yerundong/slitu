import {
  checkTypeOrError,
  isInTypes,
  isNil,
  isInvalid,
  isVoid,
  isLikeFalse,
} from "./type";

/**
 * 判断值，值替换
 */
export const displace = (value, replacement, valueRange = []) => {
  checkTypeOrError(valueRange, "Array");
  return valueRange.includes(value) ? replacement : value;
};

/**
 * 判断类型，值替换
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
