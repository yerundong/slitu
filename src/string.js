import { checkRTAOrError } from "./check";

/**
 * @description 字符串去除所有空格
 * @param {string} value 目标字符，必传
 */
export const trims = (value) => {
  checkRTAOrError(value, "value", true, ["String"]);
  return value.replace(/\s/g, "");
};

/**
 * @description 字符串超过某个长度剔除，并加上省略号（用于多行省略）
 * @param {string} value 目标字符，必传
 * @param {number} length 限定长度，必传
 */
export const strEllipsis = (value, length) => {
  checkRTAOrError(value, "value", true, ["String"]);
  checkRTAOrError(length, "length", true, ["Number"]);
  if (value.length <= length) return value;
  return value.slice(0, length - 1) + "…";
};
