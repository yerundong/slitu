import { checkTypeOrError, isArr, isStr, isFunc } from "./type";
import cloneDeep from "lodash/cloneDeep";

/**
 * object 转 formData
 * @param {Object} obj
 */
export const objectToFormData = (obj) => {
  checkTypeOrError(obj, "Object");
  const fd = new FormData();
  Object.keys(obj).forEach((key) => {
    fd.append(key, obj[key]);
  });
  return fd;
};

/**
 * formData 转 object
 * @param {Object} obj
 */
export const formDataToObject = (fd) => {
  checkTypeOrError(fd, "FormData");
  const obj = {};
  fd.forEach((value, key) => (obj[key] = value));
  return obj;
};

/**
 * 16进制颜色值转rgb、rgba颜色值
 * @param {String} hexColor
 * @param {string|number} alpha 透明度
 */
export const hexColorToRgbColor = (hexColor, alpha = 1) => {
  checkTypeOrError(hexColor, "String");
  checkTypeOrError(alpha, ["String", "Number"]);
  hexColor = hexColor.charAt(0) === "#" ? hexColor.substring(1) : hexColor;
  if (hexColor.length !== 6 && hexColor.length !== 3)
    return console.error("请传入合法的16进制的颜色值！");
  if (hexColor.length === 3) {
    hexColor = hexColor.replace(/(\w)(\w)(\w)/, "$1$1$2$2$3$3");
  }
  const reg = /\w{2}/g;
  let colors = hexColor.match(reg);
  for (let i = 0; i < colors.length; i++) {
    colors[i] = parseInt(colors[i], 16);
  }
  return {
    rgb: colors,
    rgba: colors.concat(alpha),
    rgbColor: `rgb(${colors.join()})`,
    rgbaColor: `rgba(${colors.join()},${alpha})`,
  };
};

/**
 * rgb、rgba颜色值转16进制颜色值
 * @param {String} rgbColor
 */
export const rgbColorToHexColor = (rgbColor) => {
  checkTypeOrError(rgbColor, "String");
  if (rgbColor.indexOf("rgb") < 0)
    return console.error("请传入合法的rgb形式的颜色值！");
  rgbColor = rgbColor.replace(/\s+/g, "");
  const index = rgbColor.indexOf("(") + 1;
  const colors = rgbColor.slice(index, -1).split(",").slice(0, 3);
  for (let i = 0; i < colors.length; i++) {
    if (parseInt(colors[i], 10) > 255 || parseInt(colors[i], 10) < 0)
      return console.error("颜色值范围在0到255之间！");
    colors[i] = parseInt(colors[i], 10).toString(16);
    if (colors[i].length === 1) {
      colors[i] = "0" + colors[i];
    }
  }
  return {
    hex: colors.join(""),
    hexColor: "#" + colors.join(""),
  };
};

/**
 * 数组转Map
 */
export const arrayToMap = (
  list = [],
  handle = (item) => ({ key: item.label, value: item.value })
) => {
  checkTypeOrError(list, "Array");
  checkTypeOrError(handle, "Function");
  const map = new Map();
  for (let i = 0, item; (item = list[i]); i++) {
    const { key, value } = handle(item);
    map.set(key, value);
  }
  return map;
};

/**
 * Map转数组
 */
export const mapToArray = (
  map = new Map(),
  handle = (value, label) => ({ label, value })
) => {
  checkTypeOrError(map, "Map");
  checkTypeOrError(handle, "Function");
  const list = [];
  map.forEach((value, key) => {
    const item = handle(value, key);
    list.push(item);
  });
  return list;
};

/**
 * Map转Object
 */
export const mapToObject = (map = new Map()) => {
  checkTypeOrError(map, "Map");
  const obj = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};
/**
 * 前端常用枚举数据结构转换
 * @param {Array} list json数据，格式为：[{name: 'ABC', value: '11001'}]
 * @param {Object|Array} options 配置项|多个配置项
 * @property {String} name 返回的变量名称
 * @property {String} type 返回的变量类型，可选值为：Object、Array、Map
 * @property {String} key 属性名，当type为Object/Map时方传
 * @property {String|Array|Undefined} value 属性值|属性|全部属性
 * @property {Function} filter 过滤函数
 */
export const getCommonEnumData = (list, options) => {
  checkTypeOrError(list, "Array");
  checkTypeOrError(options, ["Object", "Array"]);
  if (!isArr(options)) {
    options = [options];
  }
  const constantBox = {};
  options.forEach((optionsItem) => {
    const list_ = cloneDeep(list);
    const { name, type, key, value, filter } = optionsItem;
    let constant, valueOfValue;
    if (type === "Object") {
      constant = {};
    } else if (type === "Array") {
      constant = [];
    } else if (type === "Map") {
      constant = new Map();
    }

    for (let i = 0, item; (item = list_[i]); i++) {
      if (isFunc(filter) && !filter(item)) {
        continue;
      }
      if (isStr(value)) {
        valueOfValue = item[value];
      } else if (isArr(value)) {
        valueOfValue = {};
        value?.forEach((valEle) => {
          valueOfValue[valEle] = item[valEle];
        });
      } else {
        valueOfValue = item;
      }

      if (type === "Object") {
        constant[item[key]] = valueOfValue;
      } else if (type === "Array") {
        constant.push(valueOfValue);
      } else if (type === "Map") {
        constant.set(item[key], valueOfValue);
      }
    }
    constantBox[name] = constant;
  });
  return constantBox;
};
