import { injectable, inject } from 'inversify';
import { Guild, Message } from 'discord.js';
import shuffle from 'lodash/shuffle';
import { SYMBOLS } from '../../../di/symbols';
import { ThemeLibrary } from '../../../infrastructure/library/ThemeLibrary';
import { Role } from '../../InsiderGameTypes';
import { InvalidPlayerError } from '../../model/InvalidPlayerError';

@injectable()
export class InsiderGameService {
  private readonly baseRole: Role[] = ['マスター', 'インサイダー', '庶民', '庶民'];

  constructor(@inject(SYMBOLS.ThemeLibrary) private readonly themeLibrary: ThemeLibrary) {}

  /**
   * 配役するメソッド
   * @param targetChannel 配る先
   * @param userList ユーザーリスト
   * @param isDebug debugモード(人数制限の解除)
   */
  handOutRole(targetChannel: Guild, userList: string[], isDebug: boolean = false): string {
    const playerList = targetChannel.members.cache.filter(item => userList.includes(item.user.username));
    if (playerList.size < 4 && !isDebug) {
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
        player.user.send(`あなたの役職は${role.value}です。${isDebug ? `\nお題は${theme}です。` : ''}`);
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
    const additionalRoleCount = Math.max(playerCount + 1 - this.baseRole.length, 1);
    const additionalRole = [...new Array(additionalRoleCount)].map(_ => '庶民');
    yield* shuffle([...this.baseRole, ...additionalRole]);
  }
}
