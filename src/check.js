import {
  getType,
  isUndef,
  isArr,
  isStr,
  isValidStr,
  isFunc,
  isBool,
  isNotInTypes,
  isClass,
} from "./type";

/**
 * @description 检查参数是否符合必传性，若不符合，抛出异常
 * @param {any} value 参数值
 * @param {string} name 参数名称，必传
 * @param {string} errorTip 异常提示
 */
export const checkRequiredOrError = (value, name, errorTip = "") => {
  if (isUndef(name)) throw new Error(`Missing required parameter: "name".`);
  checkTypeOrError(name, "name", "String");
  checkTypeOrError(errorTip, "errorTip", "String");

  if (isUndef(value)) {
    let errTip = "";
    if (isValidStr(errorTip)) {
      errTip = errorTip;
    } else {
      errTip = `Missing required parameter: "${name}".`;
    }
    throw new Error(errTip);
  }
};

/**
 * @description 检查传入参数与期望类型是否一致，若不一致，抛出异常
 * @param {any} value 参数值
 * @param {string} name 参数名称，必传
 * @param {string|Class|Array<string|Class>} expType 期望类型，必传。支持自定义类类型、拓展类型。若是自定义类类型，仅支持传入class，不支持String
 * @param {boolean} exclUndefined 是否排除undefined，即值为undefined，不参与校验，默认排除
 * @param {string} errorTip 异常提示
 */
export const checkTypeOrError = (
  value,
  name,
  expType,
  exclUndefined = true,
  errorTip = ""
) => {
  if (isUndef(name)) throw new Error(`Missing required parameter: "name".`);

  if (!isStr(name))
    throw new Error(`Expected parameter "name" to be String, got ${nameType}.`);

  if (isUndef(expType))
    throw new Error(`Missing required parameter: "expType".`);

  if (isNotInTypes(expType, ["String", "Class", "Array"]))
    throw new Error(
      `Expected parameter "expType" to be string|Class|Array, got ${expTypeType}.`
    );

  if (!isBool(exclUndefined))
    throw new Error(
      `Expected parameter "exclUndefined" to be Boolean, got ${exclUndefinedType}.`
    );

  if (!isStr(errorTip))
    throw new Error(
      `Expected parameter "errorTip" to be String, got ${errorTipType}.`
    );

  // 不校验undefined的情况
  if (isUndef(value) && exclUndefined) return;

  if (isNotInTypes(value, expType)) {
    let errTip = "";
    if (isValidStr(errorTip)) {
      errTip = errorTip;
    } else {
      if (!isArr(expType)) expType = [expType];
      const expTypeStr = expType
        .map((_) => (isClass(_) ? _.name : _))
        .join("|");

      errTip = `Expected parameter "${name}" to be ${expTypeStr}, got ${getType(
        value
      )}.`;
    }
    throw new Error(errTip);
  }
};

/**
 * @description 检查参数是否在可选值范围，若不在，抛出异常
 * @param {any} value 参数值
 * @param {string} name 参数名称，必传
 * @param {Array<any>|Function} allowedValues 可选值，必传
 * @param {string} errorTip 异常提示
 */
export const checkAllowableOrError = (
  value,
  name,
  allowedValues,
  errorTip = ""
) => {
  checkRequiredOrError(name, "name");
  checkTypeOrError(name, "name", "String");

  checkRequiredOrError(allowedValues, "allowedValues");
  checkTypeOrError(allowedValues, "allowedValues", ["Array", "Function"]);

  checkTypeOrError(errorTip, "errorTip", "String");

  let exist,
    suffixTip = "";
  if (isFunc(allowedValues)) {
    exist = allowedValues(value);
  } else {
    exist = allowedValues.includes(value);
    suffixTip = ` Allowed values are: ${allowedValues.join("|")}.`;
  }

  if (!exist) {
    let errTip = "";
    if (isValidStr(errorTip)) {
      errTip = errorTip;
    } else {
      errTip = `Invalid value for "${name}": "${value}".${suffixTip}`;
    }
    throw new Error(errTip);
  }
};

/**
 * @description 依次检查必传性符合、类型符合、可选值符合，RTA代表required、type、allowable
 * @param {any} value 参数值
 * @param {string} name 参数名称，必传
 * @param {Boolean|Array} R_params checkRequiredOrError的除value、name外的参数，传入false则禁用该项校验
 * @param {Boolean|Array} T_params checkTypeOrError的除value、name外的参数，传入false则禁用该项校验
 * @param {Boolean|Array} A_params checkAllowableOrError的除value、name外的参数，传入false则禁用该项校验
 */
export const checkRTAOrError = (
  value,
  name,
  R_params = false,
  T_params = false,
  A_params = false
) => {
  checkRequiredOrError(name, "name");
  checkTypeOrError(name, "name", "String");

  checkTypeOrError(R_params, "R_params", ["Boolean", "Array"]);
  checkTypeOrError(T_params, "T_params", ["Boolean", "Array"]);
  checkTypeOrError(A_params, "A_params", ["Boolean", "Array"]);

  if (R_params)
    checkRequiredOrError(value, name, ...(R_params === true ? [] : R_params));

  if (T_params)
    checkTypeOrError(value, name, ...(T_params === true ? [] : T_params));

  if (A_params)
    checkAllowableOrError(value, name, ...(A_params === true ? [] : A_params));
};
