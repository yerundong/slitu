import { checkTypeOrError } from "./type";

/**
 * 字符串去除所有空格
 */
export const trims = (value) => {
  checkTypeOrError(value, "String");
  return value.replace(/\s/g, "");
};
