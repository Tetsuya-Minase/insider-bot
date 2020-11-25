import { inject, injectable } from 'inversify';
import { Guild, Message } from 'discord.js';
import { DiscordLibrary } from '../../../infrastructure/library/DiscordLibrary';
import config from 'config';
import { SYMBOLS } from '../../../di/symbols';

@injectable()
export class DiscordService {
  private readonly TARGET_CHANNEL_LIST = config.get<string[]>('discord.server');

  constructor(@inject(SYMBOLS.DiscordLibrary) private readonly library: DiscordLibrary) {}

  getTargetChannel(): Guild | undefined {
    return this.library.client.guilds.cache.find(item => this.TARGET_CHANNEL_LIST.includes(item.name));
  }

  getUserList(message: Message): string[] {
    // mention command userの順なので最初は捨てる
    return message.content.split(' ').slice(2);
  }
}
