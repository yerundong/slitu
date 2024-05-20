import { checkTypeOrError } from "./type";
import { pow, mul, div } from "./number";
/**
 * 比特单位之间的转换
 * @param {string} value 需要被转换的值，格式为数字+单位，如'1MB'
 * @param {string} unit 需要转换目标的单位，如'KB'
 * @returns {string} 返回字符串类型的数字，如'1024'
 * @注意 单位支持："B", "KB", "MB", "GB", "TB", "PB", "EB"。
 */
export const byteConvert = (value, unit = "B") => {
  checkTypeOrError(value, "String");
  checkTypeOrError(unit, "String");
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
