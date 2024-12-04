import { checkTypeOrError } from "./type";

/**
 * 字符串去除所有空格
 */
export const trims = (value) => {
  checkTypeOrError(value, "String");
  return value.replace(/\s/g, "");
};

/**
 * 字符串超过某个长度剔除，并加上省略号（用于多行省略）
 */
export const strEllipsis = (value, length) => {
  checkTypeOrError(value, "String");
  if (value.length <= length) {
    return value;
  }
  return value.slice(0, length - 1) + "…";
};
