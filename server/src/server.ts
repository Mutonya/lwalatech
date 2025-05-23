import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 15;
dotenv.config();

import App from './app';

async function startServer() {
    const appInstance = new App();
    await appInstance.initializeDatabaseAndStart();
}

startServer();