import express, { Application } from 'express';
import cors from 'cors';
import commodityRoutes from './routes/commodity.routes';
import errorMiddleware from './middlewares/error.middleware';
import { setupSwagger } from './utils/swagger.util';
import sequelize from './config/database.config';

const PORT = process.env.PORT || 5000;

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        console.log('Initializing Swagger...');
        setupSwagger(this.app);
        console.log('Swagger initialized');
    }

    private initializeRoutes() {
        this.app.use('/api', commodityRoutes);
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public async initializeDatabaseAndStart() {
        try {
            await sequelize.authenticate();
            console.log('Database connection established successfully');

            await sequelize.sync({ alter: true });
            console.log('Database models synchronized');

            this.app.listen(PORT, () => {
                console.log(`\nServer is running on port ${PORT}`);
                console.log(`Swagger docs: ${process.env.API_BASE_URL}${process.env.API_DOCS_PATH}`);
                console.log(`API Base URL: ${process.env.API_BASE_URL}/api\n`);
            });
        } catch (error) {
            console.error('Server startup failed:', error);
            process.exit(1);
        }
    }
}

export default App;
