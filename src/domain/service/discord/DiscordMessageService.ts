import { injectable } from 'inversify';
import { Message } from 'discord.js';
import config from 'config';

type CommandType = 'handout' | 'help' | 'debug' | 'start' | 'stop';

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

  /**
   * コマンドの内容をチェックする
   * @param message メンションできたメッセージ
   */
  checkCommand(message: Message): CommandType {
    const messageContent = message.content;
    if (messageContent.includes('handout')) {
      return 'handout';
    }
    if (messageContent.includes('debug')) {
      return 'debug';
    }
    if (messageContent.includes('start')) {
      return 'start';
    }
    if (messageContent.includes('stop')) {
      return 'stop';
    }

    return 'help';
  }
}
