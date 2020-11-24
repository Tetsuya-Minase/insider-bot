import 'reflect-metadata';
import { Container } from 'inversify';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';
import { SYMBOLS } from './symbols';
import { DiscordBot } from '../interfaces/DiscordBot';
import { InsiderServiceImpl } from '../application/impl/InsiderServiceImpl';
import { InsiderService } from '../application/InsiderService';
import { DiscordService } from '../domain/service/discord/DiscordService';
import { InsiderGameService } from '../domain/service/insider/InsiderGameService';
import { ThemeLibrary } from '../infrastructure/library/ThemeLibrary';

export const container = new Container({ defaultScope: 'Singleton' });
container.bind<DiscordLibrary>(SYMBOLS.DiscordLibrary).to(DiscordLibrary);
container.bind<DiscordBot>(SYMBOLS.DiscordBot).to(DiscordBot);
container.bind<DiscordService>(SYMBOLS.DiscordUtilityService).to(DiscordService);
container.bind<InsiderService>(SYMBOLS.InsiderService).to(InsiderServiceImpl);
container.bind<InsiderGameService>(SYMBOLS.InsiderGameService).to(InsiderGameService);
container.bind<ThemeLibrary>(SYMBOLS.ThemeLibrary).to(ThemeLibrary);
