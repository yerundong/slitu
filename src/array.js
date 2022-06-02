import { checkTypeOrError } from "./type";

/**
 * 判断两个数组是否元素相同，无关顺序
 * array1、array2的元素只能是基本类型，若是引用类型则结果判断不准确
 */
export const arraysEqualIgnoreOrder = (array1, array2) => {
  checkTypeOrError(array1, "Array");
  checkTypeOrError(array2, "Array");
  if (array1 === [] && array2 === []) return true;
  if (array1.length !== array2.length) return false;
  return array1.sort().toString() === array2.sort().toString();
};

/**
 * json获取特定值
 * 适用于[{...}, {...}, ...]格式的json
 */
export const jsonGetValue = (list, key, value) => {
  checkTypeOrError(list, "Array");
  for (let i = 0, item; (item = list[i]); i++) {
    if (item[key] === value) return item;
  }
  return null;
};
