import { checkTypeOrError } from "./check";

/**
 * @description 通过 object 数据生成 URL 查询字符串: "?a=1&b=2&c=3"
 * @param {Object} obj 目标对象
 * @param {Object} options 配置
 * @property {Boolean} prefix 生成的结果是否带?前缀，默认true
 * @property {Boolean} encode 是否对每个参数的键和值进行编码，默认false
 * @property {Boolean} stringify 是否对每个参数的值进行字符串化，默认false
 */
export const stringifyQuery = (obj = {}, options = {}) => {
  checkTypeOrError(obj, "obj", "Object");
  checkTypeOrError(options, "options", "Object");
  const defOptions = {
    prefix: true,
    encode: false,
    stringify: false,
  };

  const options_ = Object.assign({}, defOptions, options);
  const { prefix, encode, stringify } = options_;

  let str = prefix ? "?" : "";
  for (let key in obj) {
    const value = obj[key];
    let KEY, VALUE;
    KEY = encode ? encodeURIComponent(key) : key;
    const valfy = stringify ? JSON.stringify(value) : value;
    VALUE = encode ? encodeURIComponent(valfy) : valfy;
    if (str === "" || str === "?") {
      str += `${KEY}=${VALUE}`;
    } else {
      str += `&${KEY}=${VALUE}`;
    }
  }
  return str;
};

/**
 * @description 解析 URL 查询数据，生成 object 数据
 * @param {Object} obj URL 查询字符串
 * @param {Object} options 配置
 * @property {Boolean} encode 是否对每个参数的键和值进行编码，默认false
 * @property {Boolean} stringify 是否对每个参数的值进行逆字符串化，默认false
 */
export const parseQuery = (queryString = "", options = {}) => {
  checkTypeOrError(queryString, "queryString", "String");
  checkTypeOrError(options, "options", "Object");
  const defOptions = {
    encode: false,
    stringify: false,
  };
  const options_ = Object.assign({}, defOptions, options);
  const { encode, stringify } = options_;

  if (!queryString) return {};
  const arr1 = queryString.split("?");
  let queryStr;
  if (arr1.length === 1) {
    queryStr = arr1[0];
  } else if (arr1.length === 2) {
    queryStr = arr1[1];
  } else {
    return {};
  }
  const arr2 = queryStr.split("&");
  const obj = {};
  arr2.forEach((item) => {
    const [key, value] = item.split("=");
    const KEY = encode ? decodeURIComponent(key) : key;
    const deval = encode ? decodeURIComponent(value) : value;
    const VALUE = stringify ? JSON.parse(deval) : deval;
    obj[KEY] = VALUE;
  });
  return obj;
};

/**
 * @description 从浏览器url中解析查询数据
 * @param {Object} options 配置
 * @property {String} from 原始数据来自：search-从search中解析（默认），hash-从hash解析，all-从search、hash中解析合并（相同字段，search会覆盖hash）
 * @property {Boolean} encode 是否对每个参数的键和值进行编码，默认false
 * @property {Boolean} stringify 是否对每个参数的值进行逆字符串化，默认false
 */
export const getUrlQuery = (options = {}) => {
  checkTypeOrError(options, "options", "Object");
  const defOptions = {
    from: "search",
    encode: false,
    stringify: false,
  };
  const options_ = Object.assign({}, defOptions, options);
  const { from } = options_;
  const search = location.search || "";
  const hash = location.hash || "";
  let ser = {},
    has = {};
  if (from === "search" || from === "all") {
    ser = parseQuery(search, options_);
  }
  if (from === "hash" || from === "all") {
    has = parseQuery(hash.split("?")?.[1] ?? "", options_);
  }
  return Object.assign({}, has, ser);
};
