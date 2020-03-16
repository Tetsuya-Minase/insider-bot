import { injectable, inject } from 'inversify';
import { InsiderService } from '../InsiderService';
import { Message } from 'discord.js';
import { DiscordLibrary } from '../../infrastructure/library/DiscordLibrary';
import config from 'config';
import { SYMBOLS } from '../../di/symbols';
import { DiscordUtilityService } from '../../domain/service/discord/DiscordUtilityService';

@injectable()
export class InsiderServiceImpl implements InsiderService {
  constructor(@inject(SYMBOLS.DiscordUtilityService) private readonly discordUtilityService: DiscordUtilityService) {}

  manageGame(message: Message, library: DiscordLibrary): void {
    if (this.discordUtilityService.isMention(message)) {
      const targetChannel = this.discordUtilityService.getTargetChannel(library);
      if (targetChannel != undefined) {
        if (message.content.includes('casting')) {
          const player = this.discordUtilityService.getUserList(message);
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
