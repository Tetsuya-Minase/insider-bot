import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../inversify/InversifySymbols';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';
import { Message } from 'discord.js';

@injectable()
export class DiscordBot {
  private readonly TARGET_CHANNEL_LIST = [''];

  constructor(@inject(SYMBOLS.DiscordLibrary) private readonly library: DiscordLibrary) {}

  connectBot() {
    this.library.client.on('message', (msg: Message) => {
      if (msg.content.includes('<@!357120122470531074>')) {
        const targetChannel = this.library.client.guilds.cache.find(item =>
          this.TARGET_CHANNEL_LIST.includes(item.name)
        );
        if (targetChannel != undefined) {
          if (msg.content.includes('casting')) {
            const player = msg.content.split(' ');
            targetChannel.members.cache
              .filter(item => {
                return player.includes(item.user.username);
              })
              .forEach(item => item.user.send('message'));
          }
        }
        msg.reply('全員に配役したよ');
      }
    });
    this.library.client.login('');
  }
}
