import { injectable } from 'inversify';
import { InsiderService } from '../InsiderService';
import { Message } from 'discord.js';
import { DiscordLibrary } from '../../infrastructure/library/DiscordLibrary';
import config from 'config';

@injectable()
export class InsiderServiceImpl implements InsiderService {
  private readonly TARGET_CHANNEL_LIST = config.get<string[]>('discord.server');
  private readonly BOT_ID = config.get<string>('discord.botId');

  manageGame(message: Message, library: DiscordLibrary): void {
    if (message.content.includes(`<@!${this.BOT_ID}>`)) {
      const targetChannel = library.client.guilds.cache.find(item => this.TARGET_CHANNEL_LIST.includes(item.name));
      if (targetChannel != undefined) {
        if (message.content.includes('casting')) {
          const player = message.content.split(' ');
          targetChannel.members.cache
            .filter(item => {
              return player.includes(item.user.username);
            })
            .forEach(item => item.user.send('message'));
        }
      }
      message.reply('全員に配役したよ');
    }
  }
}
