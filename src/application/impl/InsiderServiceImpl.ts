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

    switch (this.discordMessageService.checkCommand(message)) {
      case 'handout':
        const userList = this.discordService.getUserList(message);
        try {
          const result = this.insiderGameService.handOutRole(targetChannel, userList);
          message.reply(result);
          return;
        } catch (ex) {
          message.reply(ex.message);
          return;
        }
      case 'debug':
        // 配役、テーマのデバッグ用
        try {
          const result = this.insiderGameService.handOutRole(
            targetChannel,
            this.discordService.getUserList(message),
            true
          );
          message.reply(result);
          return;
        } catch (ex) {
          message.reply(ex.message);
          return;
        }
      case 'start':
        const count = this.discordService.getTimerCount(message);
        this.insiderGameService.startTimer(count, message);
        return;
      case 'stop':
        this.insiderGameService.stopTimer(message);
        return;
      case 'help':
        message.reply(`これが使い方だよ。
        -----
        handout: 配役するよ。handoutの後ろにプレイヤーの名前半角スペース区切りで入れるんだよ。
        start: タイマー起動するよ。 timerの後ろにタイマーの秒数を入れるんだよ。 
        help: わからなくなったら聞いてね。
        -----
        `);
        return;
    }
  }
}
