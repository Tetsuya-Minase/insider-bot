import { injectable } from 'inversify';
import shuffle from 'lodash/shuffle';
import insiderData from '../../assets/insiderData.json';

@injectable()
export class ThemeLibrary {
  constructor() {}

  /**
   * テーマとなる単語を返却する
   */
  getTheme(): string {
    return shuffle(insiderData.theme)[0] ?? '無';
  }

  /**
   * NGワードとを返却する
   */
  getNgWord(): string {
    return shuffle(insiderData.ngWord)[0] ?? '無';
  }
}
