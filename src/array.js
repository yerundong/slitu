import { checkRTAOrError, checkTypeOrError } from "./check";

/**
 * @description 判断两个数组是否元素相同，无关顺序
 * @param {array} array1 数组1，必传
 * @param {array} array2 数组2，必传
 * array1、array2的元素只能是基本类型，若是引用类型则结果判断不准确
 */
export const arraysEqualIgnoreOrder = (array1, array2) => {
  checkRTAOrError(array1, "array1", true, ["Array"]);
  checkRTAOrError(array2, "array2", true, ["Array"]);

  if (array1 === [] && array2 === []) return true;
  if (array1.length !== array2.length) return false;
  return array1.sort().toString() === array2.sort().toString();
};

/**
 * @description 给树型结构的数组增加路径记录的属性
 * @param {array} tree 树型数组，必传
 * @param {object} options 配置信息
 * @property {string} initPath 初始路径 默认：''
 * @property {string} childrenName 树子节点名称 默认：children
 * @property {string} pathName 所添加路径记录的属性名 默认：path
 * @property {boolean} parentPath 是否添加父路径记录 默认：true
 * @property {string} parentPathName 所添加父路径记录的属性名 默认：parentPath
 */
export const recursiveAttachTreePath = (tree, options = {}) => {
  checkRTAOrError(tree, "tree", true, ["Array"]);
  checkTypeOrError(options, "options", "Object");

  const defOptions = {
    initPath: "",
    childrenName: "children",
    pathName: "path",
    parentPath: true,
    parentPathName: "parentPath",
  };

  const options_ = Object.assign({}, defOptions, options);
  const { initPath, childrenName, pathName, parentPath, parentPathName } =
    options_;
  for (let i = 0; i < tree.length; i++) {
    let item = tree[i];
    const path = `${initPath}[${i}]`;
    item[pathName] = path;
    if (parentPath) {
      item[parentPathName] = initPath;
    }
    if (item?.[childrenName]?.length > 0) {
      options_.initPath = `${path}.${childrenName}`;
      recursiveAttachTreePath(item[childrenName], options_);
    }
  }

  return tree;
};

/**
 * @description 根据数组项的 key 和 value，获取目标数组项，适用于[{key: value}]格式的数组
 * @param {array} array 数组，必传
 * @param {string} key 键名，必传
 * @param {any} value 键值
 */
export const getArrayItemBy = (array, key, value) => {
  checkRTAOrError(array, "array", true, ["Array"]);
  checkRTAOrError(key, "key", true, ["String"]);
  for (let i = 0, item; (item = array[i]); i++) {
    if (item?.[key] === value) return item;
  }
};
