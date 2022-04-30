import { Container } from "inversify";

import { LoggerInterface, Logger } from '../types/logger.types';
import { EmitterInterface, Emitter } from "../types/emitter.types";
import { WinstonLogger } from '../loaders/winston-logger';
import { CalculationEmitter } from "../loaders/calculation-emitter";

const serviceContainer = new Container();

serviceContainer.bind<LoggerInterface>(Logger).to(WinstonLogger).inSingletonScope();
serviceContainer.bind<EmitterInterface>(Emitter).to(CalculationEmitter).inSingletonScope();

export { serviceContainer };