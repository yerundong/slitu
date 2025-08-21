/**
 * @description 类型系统说明：
 * 一、原生类型：Object、Function、Array、String、Map、WeakMap、Set、WeakSet、Symbol、Boolean、Number、BigInt、
 * Undefined、Null、Date、RegExp、Promise、ArrayBuffer……
 * 二、新增的类型：NaN。本类型系统将 NaN 作为一个单独的基本类型，标识为'NaN'，而非'Number'，其他涉及到类型的均是如此，不再标注
 * P.S. 一二两类在本系统中，统称为“基本类型”。
 * 三、自定义类类型：自定义的class类，如：Person。
 * 四、此外，还新增了以下几种拓展类型，方便日常使用：
 * 1.LikeNumber, 表示'123.45'、123这种类数字类型，
 * 2.Nil, 表示 undefined, null 之一
 * 3.Invalid, 表示 undefined, null, NaN 之一
 * 4.Void, 表示 undefined, null, NaN, '' 之一
 * 5.LikeFalse, 表示 undefined, null, NaN, false, '', <=0 之一
 * 6.ValidString, 表示非空字符
 * 7.Class类、NativeClass原生内置类、CustomClass自定义类
 */

/**
 * @description 返回类型名称
 * @param {Any} value 目标数据
 * @returns {String} 返回字符串类型的类型，如'Object'
 * 注意：仅返回基本类型，不包括自定义类类型、拓展类型
 */
export const getType = (value) => {
  const type = Object.prototype.toString.call(value).slice(8, -1);
  if (Number.isNaN(value)) return "NaN";
  return type;
};

/**
 * @description 判断数据是引用类型还是基本类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const getTypeOf = (value) =>
  ["object", "function"].includes(typeof value) ? "refer" : "basic";

/**
 * @description 是否 Number 类型（不包含NaN）
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isNum = (value) => {
  return getType(value) === "Number";
};

/**
 * @description 是否 Boolean 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isBool = (value) => {
  return getType(value) === "Boolean";
};

/**
 * @description 是否 String 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isStr = (value) => {
  return getType(value) === "String";
};

/**
 * @description 是否 Array 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isArr = (value) => {
  return Array.isArray(value);
};

/**
 * @description 是否 Object 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isObj = (value) => {
  return getType(value) === "Object";
};

/**
 * @description 是否 Function 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isFunc = (value) => {
  return getType(value) === "Function";
};

/**
 * @description 是否 null 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isNul = (value) => {
  return value === null;
};

/**
 * @description 是否 undefined 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isUndef = (value) => {
  return value === undefined;
};

/**
 * @description 是否是 NaN 类型
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isNaN = (value) => {
  return Number.isNaN(value);
};

/**
 * @description 判断是否 LikeNumber 类型，即类数字
 * 类数字类型：123、"123"
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isLikeNum = (value) => {
  if (!isNum(value) && !isStr(value)) return false;
  if (value === "") return false;
  let value_ = Number(value);
  if (Number.isNaN(value_)) return false;
  return true;
};

/**
 * @description 判断数据是否是 ValidString 类型：非空字符
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isValidStr = (value) => isStr(value) && value !== "";

/**
 * @description 判断数据是否是 Nil 类型： undefined, null 之一
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isNil = (value) => [undefined, null].includes(value);

/**
 * @description 判断数据是否是 Invalid 类型：undefined, null, NaN 之一
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isInvalid = (value) => [undefined, null, NaN].includes(value);

/**
 * @description 判断数据是否是 Void 类型： undefined, null, NaN, '' 之一
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isVoid = (value) => [undefined, null, NaN, ""].includes(value);

/**
 * @description 判断数据是否是类假值类型：undefined, null, NaN, false, '', <=0 之一
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isLikeFalse = (value) =>
  [undefined, null, NaN, false, ""].includes(value) ||
  (isNum(value) && value <= 0);

/**
 * @description 检查是否为原生内置类（如Map、Array等）
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isNativeClass = (value) => {
  // 首先判断是否为函数，类本质上是特殊的函数
  if (typeof value !== "function") return false;

  // 原生类的toString包含[native code]
  const str = value.toString();
  if (!str.includes("[native code]")) return false;

  // 原生类通常可以用new调用且有prototype
  if (!value.prototype) return false;

  // 排除普通原生函数（如parseInt）
  return (
    /^function [A-Z]/.test(str.trimStart()) &&
    // 检查是否能作为构造函数使用
    (() => {
      try {
        // 尝试创建最小化实例（对部分类可能不适用，但大多数有效）
        const instance = new value();
        return instance !== null && typeof instance === "object";
      } catch (e) {
        // 对于某些需要参数的类（如Date），无参构造也会返回实例
        return true;
      }
    })()
  );
};

/**
 * @description 检查是否为自定义类（使用class语法定义）
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isCustomClass = (value) => {
  // 首先判断是否为函数，类本质上是特殊的函数
  if (typeof value !== "function") {
    return false;
  }

  // 自定义类的prototype不可枚举
  if (Object.propertyIsEnumerable.call(value, "prototype")) {
    return false;
  }
  // 自定义类的toString包含class关键字
  const str = value.toString();
  return str.includes("class ");
};

/**
 * @description 判断数据是否是类，可用于区分类和普通函数
 * @param {Any} value 目标数据
 * @returns {Boolean}
 */
export const isClass = (value) => {
  return isCustomClass(value) || isNativeClass(value);
};

/**
 * @description 判断数据是否是类型之一
 * @param {Any} value 目标数据
 * @param {String|Class|Array<String|Class>} expType 期望类型，必传。支持自定义类类型、拓展类型。若是自定义类类型，仅支持传入class，不支持String
 * @returns {Boolean}
 */
export const isInTypes = (value, expType) => {
  if (!isArr(expType)) expType = [expType];
  return (
    expType.includes(getType(value)) ||
    isInExtTypes(value, expType) ||
    expType.some((_) => {
      try {
        return value instanceof _;
      } catch {
        return false;
      }
    })
  );
};

/**
 * @description 判断数据是否不是类型之一
 * @param {Any} value 数据
 * @param {String|Class|Array<String|Class>} expType 期望类型，必传。支持自定义类类型、拓展类型。若是自定义类类型，仅支持传入class，不支持String
 * @returns {Boolean}
 */
export const isNotInTypes = (value, expType) => {
  return !isInTypes(value, expType);
};

/**
 * @description 值是否是拓展类型之一
 * @param {Any} value 数据
 * @param {String|Class|Array<String|Class>} expType 期望类型，必传。支持自定义类类型、拓展类型。若是自定义类类型，仅支持传入class，不支持String
 * @returns {Boolean}
 */
export const isInExtTypes = (value, expType) => {
  const methods = {
    isLikeNumber: isLikeNum,
    ValidString: isValidStr,
    isNil,
    isInvalid,
    isVoid,
    isLikeFalse,
    isClass,
    isNativeClass,
    isCustomClass,
  };
  if (!isArr(expType)) expType = [expType];
  return expType.some((_) => methods[`is${_}`]?.(value) ?? false);
};

/**
 * @description 判断两个值的类型是否相同
 * @param {Any} value1 数据1
 * @param {Any} value2 数据2
 * @returns {Boolean}
 */
export const isTypeEqual = (value1, value2) =>
  getType(value1) === getType(value2);
