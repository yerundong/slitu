import {
  isInTypes,
  isNil,
  isInvalid,
  isVoid,
  isLikeFalse,
  isTypeEqual,
  isUndef,
  isArr,
  isFunc,
} from "./type";

import { checkTypeOrError, checkRTAOrError } from "./check";

/**
 * @description 睡眠函数
 * @param {LikeNumber} time 睡眠时间
 */
export const sleep = async (time = 0) => {
  checkTypeOrError(time, "time", "LikeNumber");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

/**
 * @description 判断目标值是否为限定值之一，若是，则返回替换值，否，返回目标值
 * @param {Any} value 目标值
 * @param {Any} replacement 替换值
 * @param {Array} expValue 限定值，必传
 */
export const displace = (value, replacement, expValue) => {
  checkRTAOrError(expValue, "expValue", true, ["Array"]);
  return expValue.includes(value) ? replacement : value;
};

/**
 * @description 判断目标值是否为限定类型之一，若是，则返回替换值，否，返回目标值
 * @param {Any} value 目标值
 * @param {Any} replacement 替换值
 * @param {String|Class|Array<String|Class>} expType 期望类型，必传。支持自定义类类型、拓展类型。若是自定义类类型，仅支持传入class，不支持String
 */
export const displaceByType = (value, replacement, expType) => {
  checkRTAOrError(expType, "expType", true, [["String", "Array"]]);
  return isInTypes(value, expType) ? replacement : value;
};

/**
 * @description 常用无效值替换
 * @param {Any} value 目标值
 * @param {Any} replacement 替换值
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
 * @description 安全的JSON.parse
 * @param {Any} value 需要处理的数据
 * @param {Any} defRetValue JSON.parse执行报错时，或者JSON.parse执行后的数据类型与defRetValue类型不一致，则返回defRetValue
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

/**
 * @description 获取常用枚举数据结构
 * @param {Array<Object>} list json数据，格式为：[{name: 'ABC', value: '11001', ...}, ...]，必传
 * @param {Object|Array<Object>} options 配置项|多个配置项
 * @property  {String} name 返回的枚举名称
 * @property  {String} type 返回的枚举类型，支持：Object、Array、Map、Set
 * @property  {String} key 属性名，当type为Object/Map时传
 * @property  {String} value 属性值，当type为Object/Map时传
 * @property  {String} element 元素，当type为Array/Set时传
 * @property  {Function} filter 过滤函数
 */
export const getCommonEnum = (list, options) => {
  checkRTAOrError(list, "list", true, ["Array"]);
  checkRTAOrError(options, "options", true, [["Object", "Array"]]);

  if (!isArr(options)) options = [options];

  const enumBox = {};
  const getValEleType = (str) => {
    if (str.startsWith("{") && str.endsWith("}")) {
      return "obj";
    } else if (str.startsWith("[") && str.endsWith("]")) {
      return "arr";
    } else {
      return "field";
    }
  };
  const getValEleFlags = (str) => {
    return str.replace(/[\[\]{}]/g, "").split(",");
  };
  options.forEach((optItem) => {
    // 默认值
    const defOptItem = {
      value: "{...}",
      element: "{...}",
    };
    optItem = Object.assign(defOptItem, optItem);
    const { name, type, key, value, element, filter } = optItem;

    checkRTAOrError(name, "name", true, ["String"]);

    checkRTAOrError(
      type,
      "type",
      true,
      ["String"],
      [["Object", "Map", "Array", "Set"]]
    );

    if (["Object", "Map"].includes(type)) {
      checkRTAOrError(key, "key", true, ["String"]);
      checkRTAOrError(value, "value", true, ["String"]);
    } else {
      checkRTAOrError(element, "element", true, ["String"]);
    }

    checkTypeOrError(filter, "filter", "Function");

    const valEle = (
      (["Object", "Map"].includes(type) ? value : element) + ""
    ).replaceAll(" ", ""); // 有效的value或element值，去除了空格
    const valEleType = getValEleType(valEle); // valEle类型
    const valEleIsAll = ["{...}", "[...]"].includes(valEle); // 是否全字段
    let valEleFlags =
      valEleIsAll || valEleType === "field" ? null : getValEleFlags(valEle); // 字段集合

    let enumer, enumVal;

    if (type === "Object") {
      enumer = {};
    } else if (type === "Map") {
      enumer = new Map();
    } else if (type === "Array") {
      enumer = [];
    } else if (type === "Set") {
      enumer = new Set();
    } else {
      return console.error(`${name}的type不合法，无法生成枚举`);
    }

    if (["Object", "Map"].includes(type)) {
      if (isUndef(key)) {
        return console.error(`${name}的key为空，无法生成枚举`);
      }
    }

    for (let i = 0, item; (item = list[i]); i++) {
      if (isFunc(filter) && !filter(item, i)) {
        continue;
      }

      if (valEleIsAll) {
        valEleFlags = Object.keys(item);
      }

      if (valEleType === "obj") {
        enumVal = {};
        valEleFlags?.forEach((flag) => {
          enumVal[flag] = item[flag];
        });
      } else if (valEleType === "arr") {
        enumVal = [];
        valEleFlags?.forEach((flag) => {
          enumVal.push(item[flag]);
        });
      } else if (valEleType === "field") {
        enumVal = item[valEle];
      }

      if (type === "Object") {
        enumer[item[key]] = enumVal;
      } else if (type === "Map") {
        enumer.set(item[key], enumVal);
      } else if (type === "Array") {
        enumer.push(enumVal);
      } else if (type === "Set") {
        enumer.add(enumVal);
      }
    }
    enumBox[name] = enumer;
  });
  return enumBox;
};
