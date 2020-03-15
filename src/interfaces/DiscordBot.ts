import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../di/symbols';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';
import { Message } from 'discord.js';
import { InsiderService } from '../application/InsiderService';

@injectable()
export class DiscordBot {
  constructor(
    @inject(SYMBOLS.DiscordLibrary) private readonly library: DiscordLibrary,
    @inject(SYMBOLS.InsiderService) private readonly insiderService: InsiderService
  ) {}

  connectBot() {
    this.library.client.on('message', (msg: Message) => {
      this.insiderService.manageGame(msg, this.library);
    });
    this.library.client.login('');
  }
}
