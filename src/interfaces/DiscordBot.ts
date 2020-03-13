import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/InversifySymbols';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';
import { Message } from 'discord.js';

@injectable()
export class DiscordBot {
  private readonly TARGET_CHANNEL_LIST = [''];

  constructor(@inject(TYPES.DiscordLibrary) private readonly library: DiscordLibrary) {}

  connectBot() {
    this.library.client.on('ready', () => {});
    this.library.client.on('message', (msg: Message) => {
      if (msg.content === 'ping') {
        const targetChannel = this.library.client.guilds.cache.find(item =>
          this.TARGET_CHANNEL_LIST.includes(item.name)
        );
        if (targetChannel != undefined) {
          const targetUser = [''];
          targetChannel.members.cache
            .filter(item => {
              return targetUser.includes(item.user.username);
            })
            .forEach(item => item.user.send('message'));
        }
        msg.reply('全員に配役したよ');
      }
    });
    this.library.client.login('');
  }
}
