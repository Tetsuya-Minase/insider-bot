import { injectable } from 'inversify';
import { Guild, Message } from 'discord.js';
import { DiscordLibrary } from '../../../infrastructure/library/DiscordLibrary';
import config from 'config';

@injectable()
export class DiscordUtilityService {
  private readonly TARGET_CHANNEL_LIST = config.get<string[]>('discord.server');
  private readonly BOT_ID = config.get<string>('discord.botId');

  isMention(message: Message): boolean {
    return message.content.includes(`<@!${this.BOT_ID}>`);
  }

  getTargetChannel(library: DiscordLibrary): Guild | undefined {
    return library.client.guilds.cache.find(item => this.TARGET_CHANNEL_LIST.includes(item.name));
  }

  getUserList(message: Message): String[] {
    // mention command userなので最初は捨てる
    return message.content.split(' ').slice(2);
  }
}
