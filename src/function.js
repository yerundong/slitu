/**
 * 睡眠函数
 */
export const sleep = async (time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
