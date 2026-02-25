import { isLikeNum } from "./type";
import { checkTypeOrError, checkRTAOrError } from "./check";
import Decimal from "decimal.js";

/**
 * @description 各种常用数学运算
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
 * @description 小数取舍，固定小数位
 */
export const toFixed = (value, dp, rm) =>
  new Decimal(value).toFixed(dp, rm).valueOf();

/**
 * @description 小数取舍，不固定小数位
 */
export const toDP = (value, dp, rm) =>
  new Decimal(value).toDP(dp, rm).valueOf();

/**
 * @description 获取数字整数位的位数
 * @param {LikeNumber} value 目标值，必传
 * @returns {string}
 */
export const getIntFigure = (value) => {
  checkRTAOrError(value, "value", true, ["LikeNumber"]);
  const value_num = Number(value);
  return parseInt(Math.abs(value_num)).toString().length;
};

/**
 * @description 补足整数数位
 * @param {LikeNumber} value 目标值，必传
 * @param {number} figture 位数
 * @returns {string}
 */
export const completeIntDigit = (value, figture = 2) => {
  checkRTAOrError(value, "value", true, ["LikeNumber"]);
  checkTypeOrError(figture, "figture", "Number");
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
 * @description 判断数字是否相等，1===1, 1==='1'的情况都为true
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export const numEq = (value1, value2) => {
  if (!isLikeNum(value1) || !isLikeNum(value2)) return false;
  return value1 * 1 === value2 * 1;
};
