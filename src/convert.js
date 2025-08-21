import { checkRTAOrError, checkTypeOrError } from "./check";
import { pow, mul, div } from "./number";

/**
 * @description object 转 formData
 * @param {Object} obj 目标对象，必传
 */
export const objectToFormData = (obj) => {
  checkRTAOrError(obj, "obj", true, ["Object"]);
  const fd = new FormData();
  Object.keys(obj).forEach((key) => {
    fd.append(key, obj[key]);
  });
  return fd;
};

/**
 * @description formData 转 object
 * @param {Object} fd 目标formData，必传
 */
export const formDataToObject = (fd) => {
  checkRTAOrError(fd, "fd", true, ["FormData"]);
  const obj = {};
  fd.forEach((value, key) => (obj[key] = value));
  return obj;
};

/**
 * @description 数组转Map
 * @param {Array} list 数组
 * @param {Function} handle 转换处理函数
 */
export const arrayToMap = (
  list = [],
  handle = (item) => ({ key: item.label, value: item.value })
) => {
  checkTypeOrError(list, "list", "Array");
  checkTypeOrError(handle, "handle", "Function");
  const map = new Map();
  for (let i = 0, item; (item = list[i]); i++) {
    const { key, value } = handle(item);
    map.set(key, value);
  }
  return map;
};

/**
 * @description Map转数组
 * @param {Map} map
 * @param {Function} handle 转换处理函数
 */
export const mapToArray = (
  map = new Map(),
  handle = (value, label) => ({ label, value })
) => {
  checkTypeOrError(map, "map", "Map");
  checkTypeOrError(handle, "handle", "Function");
  const list = [];
  map.forEach((value, key) => {
    const item = handle(value, key);
    list.push(item);
  });
  return list;
};

/**
 * @description Map转Object
 * @param {Map} map
 */
export const mapToObject = (map = new Map()) => {
  checkTypeOrError(map, "map", "Map");
  const obj = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

/**
 * @description 比特单位之间的转换
 * @param {String} value 需要被转换的值，格式为数字+单位，如'1MB'，必传
 * @param {String} unit 需要转换目标的单位，如'KB'。单位支持："B", "KB", "MB", "GB", "TB", "PB", "EB"。
 * @returns {String} 返回字符串类型的数字，如'1024'
 */
export const byteConvert = (value, unit = "B") => {
  checkRTAOrError(value, "value", true, ["String"]);
  checkTypeOrError(unit, "unit", "String");
  const value_ = value.toLocaleUpperCase();
  const unit_ = unit.toLocaleUpperCase();
  if (!/^\d+(\.\d+)?[(EB)|(PB)|(TB)|(GB)|(MB)|(KB)|(B)]+$/.test(value_)) {
    throw new Error(`"${value}" is illegal.`);
  }
  0;
  2;
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  if (!units.includes(unit_)) {
    throw new Error(`"${unit}" is illegal.`);
  }
  let numPart = value_.match(/\d+/g)[0];
  let unitPart = value_.match(/[A-Z]+/g)[0];
  const id1 = units.indexOf(unitPart);
  const id2 = units.indexOf(unit_);
  const iddiff = id2 - id1;
  let resvalue = numPart;
  if (iddiff > 0) {
    Math.abs(10);
    resvalue = div(numPart, pow(1024, iddiff));
  } else {
    resvalue = mul(numPart, pow(1024, Math.abs(iddiff)));
  }
  return resvalue;
};
