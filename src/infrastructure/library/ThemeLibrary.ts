import config from 'config';
import { injectable } from 'inversify';
import shuffle from 'lodash/shuffle';

@injectable()
export class ThemeLibrary {
  private readonly BASE_THEME = config.get<string[]>('theme.default');

  getTheme(): string {
    return shuffle(this.BASE_THEME)[0];
  }
}
