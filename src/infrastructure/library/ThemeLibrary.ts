import { injectable } from 'inversify';
import insiderData from '../../assets/insiderData.json';

@injectable()
export class ThemeLibrary {
  constructor() {}

  getTheme(): string[] {
    return insiderData.theme;
  }
  getNgWord(): string[] {
    return insiderData.ngWord;
  }
}
