import express from 'express';
import initialiseRoutes from './routes';
import morgan from 'morgan';

function createServer() {
    const app = express();

    app.use(morgan('tiny'));
    initialiseRoutes(app);

    return app;
}

function start(port = process.env.PORT || 3000) {
    const app = createServer();

    app.listen(port, () => {
        console.info(`Server running on: ${port}`);
        console.info(`Node version: ${process.version}`);
        console.info(`NODE_ENV: ${process.env.NODE_ENV}`);
    });
}

export {start};
