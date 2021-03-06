import http from 'http';

import { serviceContainer } from './config/inversify.config';
import { LoggerInterface, Logger } from "./types/logger.types";
import app from './routers';

(async function main() {
    try {
        const loggerInstance = serviceContainer.get<LoggerInterface>(Logger);
        const { APP_PORT } = process.env;
        const server = http.createServer(app);

        server.listen(APP_PORT || 8080, function () {
            console.info(`Server is running on ${APP_PORT || 8080} port!`);

            process.on('uncaughtException', function ( err: Error ) {
                loggerInstance.logError(
                    `Error type: ${ err.name }\nError message: ${ err.message }\nError trace: ${ err.stack }`
                );
            });

            process.on('unhandledRejection', function ( reasonAny: any, p: Promise<any> ) {
                loggerInstance.logError(
                    `Error type: Promise unhandled\nReject message: ${ reasonAny }\n`
                );
            });
        })
    }
    catch (error) {
        console.error(error);
    }
}());