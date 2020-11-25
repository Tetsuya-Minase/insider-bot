import { injectable, inject } from 'inversify';
import { Guild, Message } from 'discord.js';
import { InvalidPlayerError } from '../../model/InvalidPlayerError';
import shuffle from 'lodash/shuffle';
import { SYMBOLS } from '../../../di/symbols';
import { ThemeLibrary } from '../../../infrastructure/library/ThemeLibrary';
import { Role } from '../../InsiderGameTypes';

@injectable()
export class InsiderGameService {
  private readonly baseRole: Role[] = ['マスター', 'インサイダー', '庶民', '庶民'];

  constructor(@inject(SYMBOLS.ThemeLibrary) private readonly themeLibrary: ThemeLibrary) {}

  isHandOut(message: Message): boolean {
    return message.content.includes('handout');
  }

  handOutRole(targetChannel: Guild, userList: string[]): string {
    const playerList = targetChannel.members.cache.filter(item => userList.includes(item.user.username));
    if (playerList.size < 4) {
      throw new InvalidPlayerError(playerList.size);
    }
    const theme = this.themeLibrary.getTheme();
    const getRole = this.getRoleGenerator(playerList.size);
    playerList.forEach(player => {
      const role = getRole.next();
      if (role.done) {
        player.user.send(`あなたの役職なかったよ。配り直すしかないよ。`);
        return;
      }
      if (['マスター', 'インサイダー'].includes(role.value)) {
        player.user.send(`あなたの役職は${role.value}です。\nお題は${theme}です。`);
      } else {
        player.user.send(`あなたの役職は${role.value}です。`);
      }
    });

    return 'プレイヤーに配役しました';
  }

  /**
   * 役職リストを取得するジェネレーター
   * @param playerCount プレイヤー人数
   * @private
   */
  private *getRoleGenerator(playerCount: number) {
    const roleList: Role[] = shuffle(
      [...this.baseRole, ...new Array(playerCount + 1 - this.baseRole.length)].map(_ => '庶民')
    );
    yield* roleList;
  }
}
