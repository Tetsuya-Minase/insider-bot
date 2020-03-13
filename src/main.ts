import { DiscordBot } from './interfaces/DiscordBot';
import { TYPES } from './inversify/InversifySymbols';
import { container } from './inversify/InversifyContainers';

const bot = container.get<DiscordBot>(TYPES.DiscordBot);
bot.connectBot();
