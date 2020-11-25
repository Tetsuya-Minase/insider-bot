import { Message } from 'discord.js';

export interface InsiderService {
  /**
   * メッセージを管理するメソッド
   * @param message discordに投稿されたメッセージ
   */
  manageMessage(message: Message): void;
}
