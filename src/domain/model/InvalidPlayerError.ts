export class InvalidPlayerError extends Error {
  private readonly _message: string;
  constructor(count: number) {
    super();
    this._message = `プレイヤーは4人以上必要だよ。(指定されたのは${count}人だよ。)`;
  }

  get message() {
    return this._message;
  }
}
