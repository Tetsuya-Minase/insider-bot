export class InvalidPlayerError extends Error {
  private readonly _message: string;
  constructor(count: number) {
    super();
    this._message = `playerは4人以上必要です。(指定されたのは${count}人です)`;
  }

  get message() {
    return this._message;
  }
}
