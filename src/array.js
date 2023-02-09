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
 * 给树型结构的数组增加路径记录的属性
 * @param {Object} tree 树型数组
 * @param {Object} options
 * * @property {String} initPath 初始路径 默认：''
 * * @property {String} childrenName 树子节点名称 默认：children
 * * @property {String} pathName 所添加路径记录的属性名 默认：path
 * * @property {Boolean} parentPath 是否添加父路径记录 默认：true
 * * @property {String} parentPathName 所添加父路径记录的属性名 默认：parentPath
 */
export const recursiveAttachTreePath = (tree, options = {}) => {
  checkTypeOrError(tree, "Array");
  checkTypeOrError(options, "Object");
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
