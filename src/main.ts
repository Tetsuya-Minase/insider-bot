import { DiscordBot } from './interfaces/DiscordBot';
import { SYMBOLS } from './di/symbols';
import { container } from './di/containers';

const bot = container.get<DiscordBot>(SYMBOLS.DiscordBot);
bot.connectBot();
