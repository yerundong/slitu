import { isLikeNum, checkTypeOrError } from "./type";
import Decimal from "decimal.js";

/**
 * 数学运算
 */
export const add = (...params) => Decimal.add(...params).valueOf(); // +
export const sub = (...params) => Decimal.sub(...params).valueOf(); // -
export const mul = (...params) => Decimal.mul(...params).valueOf(); // ×
export const div = (...params) => Decimal.div(...params).valueOf(); // ÷
export const sum = (...params) => Decimal.sum(...params).valueOf(); // get sum
export const eq = (x, y) => new Decimal(x).eq(y); // x = y
export const gt = (x, y) => new Decimal(x).gt(y); // x > y
export const lt = (x, y) => new Decimal(x).lt(y); // x < y
export const gte = (x, y) => new Decimal(x).gte(y); // x >= y
export const lte = (x, y) => new Decimal(x).lte(y); // x <= y
export const pow = (x, y) => Decimal.pow(x, y).valueOf(); // x^y

/**
 * 小数取舍处理
 */

export const toFixed = (value, dp, rm) =>
  new Decimal(value).toFixed(dp, rm).valueOf();

export const toDP = (value, dp, rm) =>
  new Decimal(value).toDP(dp, rm).valueOf();

/**
 * 获取数字整数位的位数
 * @param {LikeNumber} value
 * @returns {String}
 */
export const getIntFigure = (value) => {
  checkTypeOrError(value, "LikeNumber");
  const value_num = Number(value);
  return parseInt(Math.abs(value_num)).toString().length;
};

/**
 * 补足整数数位
 * @param {LikeNumber} value
 * @param {Number} figture 位数
 * @returns {String}
 */
export const completeIntDigit = (value, figture = 2) => {
  checkTypeOrError(value, "LikeNumber");
  checkTypeOrError(figture, "Number");
  if (figture < 1) figture = 1;
  const value_num = Number(value);
  const figture_ = getIntFigure(value);
  if (figture_ >= figture) {
    return value.toString();
  } else {
    const diffFig = figture - figture_;
    const value_abs = Math.abs(value_num);
    const symbol = value_num < 0 ? "-" : "";
    return `${symbol}${"0".repeat(diffFig)}${value_abs}`;
  }
};

/**
 * 判断数字是否相等
 * 1===1, 1==='1'的情况都为true
 * @param {Any} value1
 * @param {Any} value2
 * @returns {Boolean}
 */
export const numEq = (value1, value2) => {
  if (!isLikeNum(value1) || !isLikeNum(value2)) return false;
  return value1 * 1 === value2 * 1;
};
