import { isVoid } from "./type";
/**
 * 三重联动计算
 * 例如数量、标准、金额，数量*标准=金额，编辑任意一者，可实时计算其他两者，根据优先级，对应下列k1、k2、k3
 * 规则：
 * 1.一者有值，不计算
 * 2.两者有值，计算无值的那一个
 * 3.三者都有值，计算除当前活动key外，其他两个优先级高的那个
 * P.S. 优先级：k1 > k2 > k3
 * @param {object} options 配置，需要传入三个计算函数：getK1({ K2, K3 })、getK2({ K1, K3 })、getK3({ K1, K2 })
 */
class TripleLinkage {
  constructor(options) {
    this.options = options;
  }
  opr({ oprK, K1, K2, K3 }) {
    const count = [K1, K2, K3].reduce(
      (total, v) => (isVoid(v) ? total : total + 1),
      0
    );
    if (count < 2) return null;
    if (oprK === "K1" && isVoid(K1)) return null;
    if (oprK === "K2" && isVoid(K2)) return null;
    if (oprK === "K3" && isVoid(K3)) return null;
    if (oprK === "K1") {
      if (isVoid(K3)) {
        return {
          key: "K3",
          value: this.options.getK3({ K1, K2 }),
        };
      } else {
        return {
          key: "K2",
          value: this.options.getK2({ K1, K3 }),
        };
      }
    } else if (oprK === "K2") {
      if (isVoid(K3)) {
        return {
          key: "K3",
          value: this.options.getK3({ K1, K2 }),
        };
      } else {
        return {
          key: "K1",
          value: this.options.getK1({ K1, K3 }),
        };
      }
    } else if (oprK === "K3") {
      if (isVoid(K2)) {
        return {
          key: "K2",
          value: this.options.getK2({ K1, K3 }),
        };
      } else {
        return {
          key: "K1",
          value: this.options.getK1({ K2, K3 }),
        };
      }
    }
    return null;
  }
}

export default TripleLinkage;
