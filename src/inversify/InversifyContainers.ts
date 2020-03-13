import 'reflect-metadata';
import { Container } from 'inversify';
import { DiscordLibrary } from '../infrastructure/library/DiscordLibrary';
import { TYPES } from './InversifySymbols';
import { DiscordBot } from '../interfaces/DiscordBot';

const container = new Container({ defaultScope: 'Singleton' });
container.bind<DiscordLibrary>(TYPES.DiscordLibrary).to(DiscordLibrary);
container.bind<DiscordBot>(TYPES.DiscordBot).to(DiscordBot);

export { container };
