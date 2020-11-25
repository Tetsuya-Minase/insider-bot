import { injectable } from 'inversify';
import { Message } from 'discord.js';
import config from 'config';

/**
 * ディスコードのメッセージに関するクラス
 */
@injectable()
export class DiscordMessageService {
  private readonly BOT_ID = config.get<string>('discord.botId');
  /**
   * メンションかチェックする
   * @param message メッセージ
   */
  isMention(message: Message): boolean {
    return message.content.includes(`<@!${this.BOT_ID}>`);
  }
}
