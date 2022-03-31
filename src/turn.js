import { checkTypeOrError } from "./type";

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
 * 16进制颜色值转rgb颜色值
 * @param {String} hexColor
 */
export const hexColorToRgbColor = (hexColor) => {
  checkTypeOrError(hexColor, "String");
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
    rgba: colors.concat([1]),
    rgbColor: "rgb(" + colors.join() + ")",
    rgbaColor: "rgba(" + colors.join() + ",1)",
  };
};

/**
 * rgb颜色值转16进制颜色值
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
