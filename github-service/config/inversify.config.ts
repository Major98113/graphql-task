import { Container } from "inversify";

import { LoggerInterface, Logger } from '../types/logger.types';

import { WinstonLogger } from '../loaders/winston-logger';

const serviceContainer = new Container();

serviceContainer.bind<LoggerInterface>(Logger).to(WinstonLogger).inSingletonScope();

export { serviceContainer };