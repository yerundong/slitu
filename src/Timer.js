/**
 * @description 计时器
 */
class Timer {
  #startTime = null;
  #endTime = null;
  constructor(timeStamp) {
    this.#startTime = timeStamp || new Date().getTime();
  }
  start(timeStamp) {
    this.#startTime = timeStamp || new Date().getTime();
    this.#endTime = null;
    return this;
  }
  end(timeStamp) {
    this.#endTime = timeStamp || new Date().getTime();
    return this;
  }
  getDiff(timeStamp) {
    if (timeStamp) {
      return timeStamp - this.#startTime;
    } else if (this.#endTime) {
      return this.#endTime - this.#startTime;
    } else {
      return new Date().getTime() - this.#startTime;
    }
  }
  moreThan(millisecond) {
    return this.getDiff() >= millisecond;
  }
  getStartTime() {
    return this.#startTime;
  }
  getEndTime() {
    return this.#endTime;
  }
}

export default Timer;
