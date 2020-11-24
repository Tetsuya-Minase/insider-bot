import { injectable, inject } from 'inversify';
import { InsiderService } from '../InsiderService';
import { Message } from 'discord.js';
import { DiscordLibrary } from '../../infrastructure/library/DiscordLibrary';
import { SYMBOLS } from '../../di/symbols';
import { DiscordService } from '../../domain/service/discord/DiscordService';
import { InsiderGameService } from '../../domain/service/insider/InsiderGameService';

@injectable()
export class InsiderServiceImpl implements InsiderService {
  constructor(
    @inject(SYMBOLS.DiscordUtilityService) private readonly discordUtilityService: DiscordService,
    @inject(SYMBOLS.InsiderGameService) private readonly insiderGameService: InsiderGameService
  ) {}

  manageGame(message: Message, library: DiscordLibrary): void {
    if (this.discordUtilityService.isMention(message)) {
      const targetChannel = this.discordUtilityService.getTargetChannel(library);
      if (targetChannel != undefined) {
        if (this.insiderGameService.isHandOut(message)) {
          const userList = this.discordUtilityService.getUserList(message);
          try {
            this.insiderGameService.handOutRole(targetChannel, userList);
          } catch (ex) {
            message.reply(ex.message);
            return;
          }
        }
      }
      message.reply('全員に配役したよ');
    }
  }
}
