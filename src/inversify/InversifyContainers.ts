import 'reflect-metadata';
import { Container } from 'inversify';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';
import { SYMBOLS } from './InversifySymbols';
import { DiscordBot } from '../interfaces/DiscordBot';

export const container = new Container({ defaultScope: 'Singleton' });
container.bind<DiscordLibrary>(SYMBOLS.DiscordLibrary).to(DiscordLibrary);
container.bind<DiscordBot>(SYMBOLS.DiscordBot).to(DiscordBot);
