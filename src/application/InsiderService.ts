import { Message } from 'discord.js';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';

export interface InsiderService {
  /**
   *
   * @param message
   * @param library
   */
  manageGame(message: Message, library: DiscordLibrary): void;
}
