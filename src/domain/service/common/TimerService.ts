import { injectable } from 'inversify';
import Timeout = NodeJS.Timeout;

@injectable()
export class TimerService {
  private timer: Timeout | undefined;
  private interval: Timeout | undefined;
  private startTime: number | undefined;
  private passTime = 1;

  /**
   * タイマーを起動する
   * @param seconds タイマーの時間
   */
  startTimer(seconds: number): Promise<number | undefined> {
    if (this.timer) {
      return Promise.resolve(undefined);
    }
    return new Promise(resolve => {
      this.timer = setTimeout(() => {
        this.reflesh();
        const currentPassTime = this.passTime;
        this.passTime = 1;
        resolve(seconds - currentPassTime);
      }, seconds * 1000);
      // 毎秒カウントを増やす
      this.interval = setInterval(() => (this.passTime += 1), 1000);
      // 開始時間を保持しておく
      this.startTime = seconds;
    });
  }

  /**
   * タイマーを停止
   */
  stopTimer(): Promise<number | undefined> {
    if (this.timer == undefined || this.startTime == undefined) {
      return Promise.resolve(undefined);
    }
    this.reflesh();
    const pastTime = this.startTime - this.passTime;
    this.passTime = 1;
    return Promise.resolve(pastTime);
  }

  /**
   * タイマーをリフレッシュする
   * @private
   */
  private reflesh() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.timer = undefined;
    this.interval = undefined;
  }
}
