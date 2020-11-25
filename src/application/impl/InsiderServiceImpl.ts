import { injectable, inject } from 'inversify';
import { InsiderService } from '../InsiderService';
import { Message } from 'discord.js';
import { SYMBOLS } from '../../di/symbols';
import { DiscordService } from '../../domain/service/discord/DiscordService';
import { InsiderGameService } from '../../domain/service/insider/InsiderGameService';

@injectable()
export class InsiderServiceImpl implements InsiderService {
  constructor(
    @inject(SYMBOLS.DiscordUtilityService) private readonly discordUtilityService: DiscordService,
    @inject(SYMBOLS.InsiderGameService) private readonly insiderGameService: InsiderGameService
  ) {}

  manageGame(message: Message): void {
    if (this.discordUtilityService.isMention(message)) {
      const targetChannel = this.discordUtilityService.getTargetChannel();
      if (targetChannel != undefined) {
        if (this.insiderGameService.isHandOut(message)) {
          const userList = this.discordUtilityService.getUserList(message);
          try {
            const result = this.insiderGameService.handOutRole(targetChannel, userList);
            message.reply(result);
          } catch (ex) {
            message.reply(ex.message);
            return;
          }
        }
      }
    }
  }
}
