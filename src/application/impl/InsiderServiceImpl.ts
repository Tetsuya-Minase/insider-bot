import { injectable } from 'inversify';
import { InsiderService } from '../InsiderService';
import { Message } from 'discord.js';
import { DiscordLibrary } from '../../infrastructure/library/DiscordLibrary';

@injectable()
export class InsiderServiceImpl implements InsiderService {
  private readonly TARGET_CHANNEL_LIST = [''];
  manageGame(message: Message, library: DiscordLibrary): void {
    if (message.content.includes('<@!357120122470531074>')) {
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
