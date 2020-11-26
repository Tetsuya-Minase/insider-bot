import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../di/symbols';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';
import { Message } from 'discord.js';
import { InsiderService } from '../application/InsiderService';
import config from 'config';

@injectable()
export class DiscordBot {
  constructor(
    @inject(SYMBOLS.DiscordLibrary) private readonly library: DiscordLibrary,
    @inject(SYMBOLS.InsiderService) private readonly insiderService: InsiderService,
    private readonly token: string = config.get<string>('discord.token')
  ) {}

  connectBot() {
    this.library.client.on('message', (msg: Message) => {
      this.insiderService.manageMessage(msg);
    });
    this.library.client.login(this.token);
  }
}
