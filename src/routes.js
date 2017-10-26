import validateApiKey from './middleware/validateApiKey';
import requestInformation from './middleware/requestInformation';
import * as amazonApi from './middleware/amazonApi';
import notFoundHandler from './middleware/notFoundHandler';
import defaultErrorHandler from './middleware/defaultErrorHandler';
import amazonApiRoutes from './routes/amazonApi';
import botRoutes from './routes/bot';

function initialiseRoutes(app) {
    app.use(validateApiKey);
    app.use(requestInformation);

    app.use('/api/apa', amazonApiRoutes);
    app.use('/api/bot', botRoutes);

    app.get('/', (request, response) => {
        response.json({});
    });

    app.use(notFoundHandler);
    app.use(defaultErrorHandler);
}

export default initialiseRoutes;
