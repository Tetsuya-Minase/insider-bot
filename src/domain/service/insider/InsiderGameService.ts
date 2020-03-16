import { injectable, inject } from 'inversify';
import { Guild, Message } from 'discord.js';
import { InvalidPlayerError } from '../../model/InvalidPlayerError';
import shuffle from 'lodash/shuffle';
import { SYMBOLS } from '../../../di/symbols';
import { ThemeLibrary } from '../../../infrastructure/library/ThemeLibrary';

@injectable()
export class InsiderGameService {
  private readonly baseRole = ['マスター', 'インサイダー', '庶民', '庶民'];

  constructor(@inject(SYMBOLS.ThemeLibrary) private readonly themeLibrary: ThemeLibrary) {}

  isHandOut(message: Message): boolean {
    return message.content.includes('handout');
  }

  handOutRole(targetChannel: Guild, userList: string[]): string {
    const playerList = targetChannel.members.cache.filter(item => userList.includes(item.user.username));
    if (playerList.size < 4) {
      throw new InvalidPlayerError(playerList.size);
    }
    const roleList = this.getRoleList(playerList.size);
    // TODO: やめたい
    // ループ用index
    let index = 0;
    playerList.forEach(player => {
      const role = roleList[index];
      const theme = this.themeLibrary.getTheme();
      if (['マスター', 'インサイダー'].includes(role)) {
        player.user.send(`あなたの役職は${roleList[index]}です。\nお題は${theme}です。`);
      } else {
        player.user.send(`あなたの役職は${roleList[index]}です。`);
      }
      index++;
    });
    return 'プレイヤーに配役しました';
  }

  private getRoleList(playerCount: number): string[] {
    return shuffle([...this.baseRole, ...[...new Array(playerCount + 1 - this.baseRole.length)].map(_ => '庶民')]);
  }
}
