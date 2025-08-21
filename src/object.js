import { isFunc, isArr, isObj, isInTypes } from "./type";
import { checkTypeOrError, checkRTAOrError } from "./check";
import { uuid } from "./crypto";
import cloneDeep from "lodash/cloneDeep";
import eq from "lodash/eq";

/**
 * @description 移除对象无效属性
 * @param {Object} value 目标对象，必传
 * @param {Object} options 配置
 * @property {Boolean} deepClone 是否深拷贝，是则不影响原对象 默认：false
 * @property {Boolean} recursion 是否递归 默认：false
 * 以下为过滤字段，优先级从高到低
 * @property {Function} filterFunction 过滤函数 默认：无
 * @property {Any} filterValue 过滤值 默认：一串无序唯一的字符
 * @property {Array} filterValues 过滤值数组 默认：null
 * @property {String | Array} filterType 过滤类型，支持拓展类型 默认："Void"
 */
export const removeInvalidProp = (value, options = {}) => {
  checkRTAOrError(value, "value", true, ["Object"]);
  checkTypeOrError(options, "options", "Object");

  const uuidStr = uuid() + new Date().getTime();
  const defOptions = {
    deepClone: false,
    recursion: false,
    filterFunction: null,
    filterValue: uuidStr,
    filterValues: null,
    filterType: "Void",
  };
  const {
    deepClone,
    recursion,
    filterFunction,
    filterValues,
    filterValue,
    filterType,
  } = Object.assign({}, defOptions, options);
  const obj_ = deepClone ? cloneDeep(value) : value;
  Object.keys(obj_).forEach((key) => {
    if (recursion && isObj(obj_[key])) {
      obj_[key] = removeInvalidProp(obj_[key], options);
    } else {
      const match =
        (isFunc(filterFunction) && filterFunction(obj_[key])) ||
        (filterValue !== uuidStr && eq(obj_[key], filterValue)) ||
        (isArr(filterValues) && filterValues.includes(obj_[key])) ||
        isInTypes(obj_[key], filterType);
      if (match) {
        delete obj_[key];
      }
    }
  });
  return obj_;
};

/**
 * @description 移除对象额外的属性
 * @param {Object} value 目标对象，必传
 * @param {Array|Object} props 需要处理的属性集合，可以是key的数组，也可以取一个对象的key
 * @param {Object} options 配置
 * @property {Boolean} deepClone 是否深拷贝 默认：false
 * @property {String} type 类型：exclude-排除，include-包含，默认：exclude
 */
export const removeExtraProp = (value, props = [], options = {}) => {
  checkRTAOrError(value, "value", true, ["Object"]);
  checkTypeOrError(props, "props", ["Array", "Object"]);
  checkTypeOrError(options, "options", "Object");
  const defOptions = {
    deepClone: false,
    type: "exclude",
  };
  const { deepClone, type } = Object.assign({}, defOptions, options);
  const value_ = deepClone ? cloneDeep(value) : value;

  const keys = isArr(props) ? props : Object.keys(props);
  for (const key in value_) {
    const fitDel =
      type === "include" ? !keys.includes(key) : keys.includes(key);
    if (fitDel) {
      delete value_[key];
    }
  }
  return value_;
};
