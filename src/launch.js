import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import initialiseRoutes from './routes';
import logger from './logger';

function createServer() {
    const app = express();

    app.use(morgan('tiny'));
    app.use(compression());

    initialiseRoutes(app);

    return app;
}

function start(port = process.env.PORT || 3000) {
    const app = createServer();

    app.listen(port, () => {
        logger.info(`Server running on: ${port}`);
        logger.info(`Node version: ${process.version}`);
        logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
    });
}

export {start};
