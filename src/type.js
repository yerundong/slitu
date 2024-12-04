/**
 * 数据类型说明：
 * 共有基本类型：Object、Function、Array、String、Map、WeakMap、Set、WeakSet、Symbol、Number、Undefined、NaN、Null
 * 注意：
 *  1.本类型系统将 NaN 作为一个单独的基本类型，标识为'NaN'，而非'Number'，其他涉及到类型的均是如此，不再标注
 *  2.此外，还新增了以下几种种组合类型，方便日常判断：
 *    1.LikeNumber, 表示'123.45'、123这种类数字类型，
 *    2.Nil, 表示 undefined, null 之一
 *    3.Invalid, 表示 undefined, null, NaN, '' 之一
 *    4.Void, 表示 undefined, null, NaN, '' 之一
 *    5.LikeFalse, 表示 undefined, null, NaN, false, '', <=0 之一
 *    6.ValidString, 表示非空字符
 */

/**
 * 返回类型名称
 * 注意：不包括组合类型
 */
export const getType = (value) => {
  const type = Object.prototype.toString.call(value).slice(8, -1);
  if (Number.isNaN(value)) return "NaN";
  return type;
};
/**
 * 判断数据是引用类型还是基本类型
 */
export const getTypeOf = (value) =>
  ["object", "function"].includes(typeof value) ? "refer" : "basic";

/**
 * 是否 Number 类型（不包含NaN）
 */
export const isNum = (value) => {
  return getType(value) === "Number";
};

/**
 * 是否 Boolean 类型
 */
export const isBool = (value) => {
  return getType(value) === "Boolean";
};
/**
 * 是否 String 类型
 */
export const isStr = (value) => {
  return getType(value) === "String";
};
/**
 * 是否 Array 类型
 */
export const isArr = (value) => {
  return Array.isArray(value);
};
/**
 * 是否 Object 类型
 */
export const isObj = (value) => {
  return getType(value) === "Object";
};
/**
 * 是否 Function 类型
 */
export const isFunc = (value) => {
  return getType(value) === "Function";
};
/**
 * 是否 null 类型
 */
export const isNul = (value) => {
  return value === null;
};
/**
 * 是否 undefined 类型
 */
export const isUndef = (value) => {
  return value === undefined;
};
/**
 * 是否是 NaN
 */
export const isNaN = (value) => {
  return Number.isNaN(value);
};

/**
 * 判断是否 LikeNumber 类型：类数字
 * 类数字类型：123、"123"
 */
export const isLikeNum = (value) => {
  if (!isNum(value) && !isStr(value)) return false;
  if (value === "") return false;
  let value_ = Number(value);
  if (Number.isNaN(value_)) return false;
  return true;
};

/**
 * 判断数据是否是 ValidString 类型：非空字符
 */
export const isValidStr = (value) => isStr(value) && value !== "";

/**
 * 判断数据是否是 Nil 类型： undefined, null 之一
 */

export const isNil = (value) => [undefined, null].includes(value);
/**
 * 判断数据是否是 Invalid 类型：undefined, null, NaN 之一
 */

export const isInvalid = (value) => [undefined, null, NaN].includes(value);
/**
 * 判断数据是否是 Void 类型： undefined, null, NaN, '' 之一
 */

export const isVoid = (value) => [undefined, null, NaN, ""].includes(value);

/**
 * 判断数据是否是类假值类型：undefined, null, NaN, false, '', <=0 之一
 */
export const isLikeFalse = (value) =>
  [undefined, null, NaN, false, ""].includes(value) ||
  (isNum(value) && value <= 0);

/**
 * 判断数据是否是类型之一
 * 注意：
 *  1.expType支持字符串、数组格式
 *  2.expType支持组合类型
 */
export const isInTypes = (value, expType) => {
  checkTypeOrError(expType, ["String", "Array"]);
  if (isStr(expType)) expType = [expType];
  return expType.includes(getType(value)) || isCombinationType(value, expType);
};

/**
 * 判断数据是否不是类型之一
 * 注意：
 *  1.expType支持字符串、数组格式
 *  2.expType支持组合类型
 */
export const isNotInTypes = (value, expType) => {
  return !isInTypes(value, expType);
};

/**
 * 判断两个值的类型是否相同
 */
export const isTypeEqual = (value1, value2) =>
  getType(value1) === getType(value2);
/**
 * 判断传入数据与期望类型是否一致，若不一致，抛出异常
 * 注意：
 *  1.expType支持字符串、数组格式
 *  2.expType支持组合类型
 */
export const checkTypeOrError = (value, expType, errorTip) => {
  const gotExpType = getType(expType);
  if (!["String", "Array"].includes(gotExpType)) {
    throw new Error(
      `[Invalid params]: type check failed for params, expType expected String | Array, got ${gotExpType}.`
    );
  }

  if (isStr(expType)) expType = [expType];
  const valueType = getType(value);
  const match =
    expType.includes(valueType) || isCombinationType(value, expType);

  if (!match) {
    let errTip = "";
    if (isValidStr(errorTip)) {
      errTip = errorTip;
    } else {
      const expTypeStr = expType.join(" | ");
      errTip = `[Invalid params]: type check failed for params, Expected ${expTypeStr}, got ${valueType}.`;
    }
    throw new Error(errTip);
  }
};

// 值是否是某个数组里的组合类型
const isCombinationType = (value, cbTypeArray = []) => {
  const methods = {
    isLikeNumber: isLikeNum,
    ValidString: isValidStr,
    isNil,
    isInvalid,
    isVoid,
    isLikeFalse,
  };
  return cbTypeArray.some((_) => methods[`is${_}`]?.(value) ?? false);
};
