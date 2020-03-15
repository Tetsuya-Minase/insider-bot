import { DiscordBot } from './interfaces/DiscordBot';
import { SYMBOLS } from './inversify/InversifySymbols';
import { container } from './inversify/InversifyContainers';

const bot = container.get<DiscordBot>(SYMBOLS.DiscordBot);
bot.connectBot();
