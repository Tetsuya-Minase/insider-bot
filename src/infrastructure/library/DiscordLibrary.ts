import {Client} from 'discord.js';
import {injectable} from 'inversify';

@injectable()
export class DiscordLibrary {
  private readonly _discordClient: Client;
  constructor() {
    this._discordClient = new Client();
  }
  get client() {
    return this._discordClient;
  }
}
