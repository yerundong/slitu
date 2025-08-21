import { checkRTAOrError } from "./check";
import { isVoid } from "./type";
/**
 * @description 三重联动计算
 * 例如数量、标准、金额，数量*标准=金额，编辑任意一者，可实时计算其他两者，根据优先级，对应下列k1、k2、k3
 * 规则：
 * 1.一者有值，不计算
 * 2.两者有值，计算无值的那一个
 * 3.三者都有值，计算除当前操作key外，其他两个优先级高的那个
 */
class TripleLinkage {
  /**
   * @param {Object} options 构造配置，必传
   * @property {Array} options.keys 字段名称及优先级， 如：[key1, key2, key3]
   * @property {Function} options.key1 字段key1计算函数
   * @property {Function} options.key2 字段key2计算函数
   * @property {Function} options.key3 字段key3计算函数
   */
  constructor(options) {
    checkRTAOrError(options, "options", true, ["Object"]);
    this.options = options;
  }

  /**
   * @param {Object} oprOpt 操作配置
   * @property {Array} options.curKey 当前操作key
   * @property {Any} options.key1 key1值
   * @property {Any} options.key2 key2值
   * @property {Any} options.key3 key3值
   */
  opr(oprOpt) {
    checkRTAOrError(oprOpt, "oprOpt", true, ["Object"]);
    const curKey = oprOpt.curKey;
    const [K1, K2, K3] = this.options.keys;
    const V1 = oprOpt[K1];
    const V2 = oprOpt[K2];
    const V3 = oprOpt[K3];
    const count = [V1, V2, V3].reduce(
      (total, v) => (isVoid(v) ? total : total + 1),
      0
    );
    if (count < 2) return null;
    if (curKey === K1 && isVoid(V1)) return null;
    if (curKey === K2 && isVoid(V2)) return null;
    if (curKey === K3 && isVoid(V3)) return null;
    if (curKey === K1) {
      if (isVoid(V3)) {
        return {
          key: K3,
          value: this.options[K3]({ [K1]: V1, [K2]: V2 }),
        };
      } else {
        return {
          key: K2,
          value: this.options[K2]({ [K1]: V1, [K3]: V3 }),
        };
      }
    } else if (curKey === K2) {
      if (isVoid(V3)) {
        return {
          key: K3,
          value: this.options[K3]({ [K1]: V1, [K2]: V2 }),
        };
      } else {
        return {
          key: K1,
          value: this.options[K1]({ [K2]: V2, [K3]: V3 }),
        };
      }
    } else if (curKey === K3) {
      if (isVoid(V2)) {
        return {
          key: K2,
          value: this.options[K2]({ [K1]: V1, [K3]: V3 }),
        };
      } else {
        return {
          key: K1,
          value: this.options[K1]({ [K2]: V2, [K3]: V3 }),
        };
      }
    }
    return null;
  }
}

export default TripleLinkage;
