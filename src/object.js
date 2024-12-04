import { checkTypeOrError, isFunc, isArr, isObj, isInTypes } from "./type";
import { uuid } from "./crypto";
import cloneDeep from "lodash/cloneDeep";
import eq from "lodash/eq";

/**
 * 移除对象无效属性
 * @param {Object} obj
 * @param {Object} options
 * * @property {Boolean} deepClone 是否深拷贝 默认：false
 * * @property {Boolean} recursion 是否递归 默认：false
 * * 以下为过滤字段，优先级从高到低
 * * @property {Function} filterFunction 过滤函数 默认：无
 * * @property {Any} filterValue 过滤值 默认：一串无序唯一的字符
 * * @property {Array} filterValues 过滤值数组 默认：null
 * * @property {String | Array} filterType 过滤类型，支持组合类型 默认："Void"
 */
export const removeInvalidProp = (obj, options = {}) => {
  checkTypeOrError(obj, "Object");
  checkTypeOrError(options, "Object");

  const uuidStr = uuid() + new Date().getTime();
  const defOptions = {
    deepClone: false,
    recursion: false,
    filterFunction: null,
    filterValue: uuidStr,
    filterValues: null,
    filterType: "Void",
  };
  const options_ = Object.assign({}, defOptions, options);
  console.log("options_: ", options_);
  const {
    deepClone,
    recursion,
    filterFunction,
    filterValues,
    filterValue,
    filterType,
  } = options_;
  let obj_;
  if (deepClone) {
    obj_ = cloneDeep(obj);
  } else {
    obj_ = obj;
  }
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
