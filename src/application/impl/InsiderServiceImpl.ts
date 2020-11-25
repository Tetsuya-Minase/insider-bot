import { injectable, inject } from 'inversify';
import { InsiderService } from '../InsiderService';
import { Message } from 'discord.js';
import { SYMBOLS } from '../../di/symbols';
import { DiscordService } from '../../domain/service/discord/DiscordService';
import { InsiderGameService } from '../../domain/service/insider/InsiderGameService';
import { DiscordMessageService } from '../../domain/service/discord/DiscordMessageService';

@injectable()
export class InsiderServiceImpl implements InsiderService {
  constructor(
    @inject(SYMBOLS.DiscordService) private readonly discordService: DiscordService,
    @inject(SYMBOLS.DiscordMessageService) private readonly discordMessageService: DiscordMessageService,
    @inject(SYMBOLS.InsiderGameService) private readonly insiderGameService: InsiderGameService
  ) {}

  manageMessage(message: Message): void {
    // メンション以外には反応しない
    if (!this.discordMessageService.isMention(message)) {
      return;
    }

    const targetChannel = this.discordService.getTargetChannel();
    // 投稿先チャンネル取れなければ何もしない
    if (targetChannel == undefined) {
      return;
    }

    // 配役
    if (this.insiderGameService.isHandOut(message)) {
      const userList = this.discordService.getUserList(message);
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
