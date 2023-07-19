import {
  checkTypeOrError,
  isFunc,
  isNil,
  isArr,
  isInvalid,
  isLikeFalse,
  isVoid,
  isObj,
} from "./type";
import cloneDeep from "lodash/cloneDeep";
import eq from "lodash/eq";

/**
 * 移除对象无效属性
 * @param {Object} obj
 * @param {Object} options
 * * @property {Boolean} deepClone 是否深拷贝 默认：false
 * * @property {Boolean} recursion 是否递归 默认：false
 * * @property {Function} filterFunction 过滤函数
 * * @property {Array} filterValues 过滤值
 * * @property {*} filterValues 过滤值
 * * @property {String} filterType 过滤类型 默认："void"
 */
export const removeInvalidProp = (obj, options = {}) => {
  checkTypeOrError(obj, "Object");
  checkTypeOrError(options, "Object");
  const defOptions = {
    deepClone: false,
    recursion: false,
    filterFunction: null,
    filterValues: null,
    filterValue: options.filterValue + "_unq",
    filterType: "void",
  };
  const options_ = Object.assign({}, defOptions, options);
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
      if (isFunc(filterFunction)) {
        filterFunction(obj_[key]) && delete obj_[key];
      } else if (isArr(filterValues)) {
        filterValues.includes(obj_[key]) && delete obj_[key];
      } else if (filterValue !== options.filterValue + "_unq") {
        eq(obj_[key], filterValue) && delete obj_[key];
      } else if (["nil", "invalid", "void", "likeFalse"].includes(filterType)) {
        let filt_fn;
        if (filterType === "nil") {
          filt_fn = isNil;
        } else if (filterType === "invalid") {
          filt_fn = isInvalid;
        } else if (filterType === "void") {
          filt_fn = isVoid;
        } else if (filterType === "likeFalse") {
          filt_fn = isLikeFalse;
        }
        filt_fn(obj_[key]) && delete obj_[key];
      }
    }
  });
  return obj_;
};
