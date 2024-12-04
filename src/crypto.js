import CryptoJS from "crypto-js";
import { checkTypeOrError } from "./type";

/**
 * @description 生成uuid，根据随机数，或者伪随机数生成UUID，有非常小的的重复概率
 * @param { Number | Undefined } len 长度
 * @param { Number | Undefined} radix 基数
 */
export const uuid = (len, radix) => {
  checkTypeOrError(len, ["Number", "Undefined"]);
  checkTypeOrError(radix, ["Number", "Undefined"]);
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
};

/**
 * @description: base64加密
 * @param {String} word 需要加密的字符串
 */
export const base64Encrypt = (word) => {
  checkTypeOrError(word, "String");
  const wordArray = CryptoJS.enc.Utf8.parse(word);
  const base64 = CryptoJS.enc.Base64.stringify(wordArray);
  return base64;
};

/**
 * @description: base64解密
 * @param {String} word 需要解密的字符串
 */
export const base64Decrypt = (word) => {
  checkTypeOrError(word, "String");
  const wordArray = CryptoJS.enc.Base64.parse(word);
  const deBase64 = wordArray.toString(CryptoJS.enc.Utf8);
  return deBase64;
};

/**
 * @description: 得到base64数据，补全前缀变成base64的url，如：data:image/png;base64,……
 * @param {String} format 文件格式，如png、pdf
 * @param {String} base64Data base64数据
 */
export const completeBase64Url = (format, base64Data) => {
  checkTypeOrError(format, "String");
  checkTypeOrError(base64Data, "String");
  let formt = format.toLowerCase();
  let type = "";
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(formt)) {
    type = "image";
    if (formt === "jpg") {
      formt === "jpeg";
    } else if (formt === "svg") {
      formt === "svg+xml";
    }
  } else if (["pdf", "doc", "docx", "ppt"].includes(formt)) {
    type = "application";
    if (formt === "doc") {
      formt === "msword";
    } else if (formt === "docx") {
      formt === "vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (formt === "ppt") {
      formt === "vnd.ms-powerpoint";
    }
  } else if (["txt"].includes(formt)) {
    type = "text";
    if (formt === "txt") {
      formt === "plain";
    }
  }
  return `data:${type}/${formt};base64,${base64Data}`;
};

/**
 * @description: 得到base64的Url，剔除base64Url的前缀，得到base64数据
 * @param {String} base64Url base64的url
 */
export const removeBase64UrlPrefix = (base64Url) => {
  checkTypeOrError(base64Url, "String");
  const index = base64Url.search("base64,");
  return base64Url.substring(index + 7);
};
