import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Commodity } from '../models/commodity.model';
import { CommodityRequest } from '../models/commodityRequest.model';
import * as dotenv from 'dotenv';
import { EventEmitter } from 'events';

dotenv.config();

// Increase EventEmitter limit to prevent memory leak warnings
EventEmitter.defaultMaxListeners = 20; // Set to an appropriate number for your application

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    models: [User, Commodity, CommodityRequest],
    logging: console.log,
    pool: {
        max: 10, // Maximum number of connections in pool
        min: 2,  // Minimum number of connections in pool
        idle: 30000, // Maximum time (ms) that a connection can be idle
        acquire: 60000 // Maximum time (ms) to try to get a connection
    }
});

export default sequelize;