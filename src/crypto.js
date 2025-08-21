import CryptoJS from "crypto-js";
import { checkRTAOrError } from "./check";

/**
 * @description 生成符合 RFC 4122 标准的 UUID v4
 * 格式: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * 其中 y 为 8, 9, A 或 B
 * @returns {String} 生成的 UUID v4 字符串
 */
export const uuid = () => {
  // 利用浏览器原生 API（如果存在），性能最优
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // 兼容环境：手动生成
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    // 生成随机数 (0-15)
    const r = (Math.random() * 16) | 0;
    // 替换 x 为随机数，y 为 8-11 之间的数（即 8,9,A,B）
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    // 转换为十六进制字符串
    return v.toString(16);
  });
};

/**
 * @description: base64加密
 * @param {String} word 需要加密的字符串，必传
 */
export const base64Encrypt = (word) => {
  checkRTAOrError(word, "word", true, ["String"]);
  const wordArray = CryptoJS.enc.Utf8.parse(word);
  const base64 = CryptoJS.enc.Base64.stringify(wordArray);
  return base64;
};

/**
 * @description: base64解密
 * @param {String} word 需要解密的字符串，必传
 */
export const base64Decrypt = (word) => {
  checkRTAOrError(word, "word", true, ["String"]);
  const wordArray = CryptoJS.enc.Base64.parse(word);
  const deBase64 = wordArray.toString(CryptoJS.enc.Utf8);
  return deBase64;
};
