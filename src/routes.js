import validateApiKey from './middleware/validateApiKey';
import * as amazonApi from './middleware/amazonApi';
import notFoundHandler from './middleware/notFoundHandler';
import defaultErrorHandler from './middleware/defaultErrorHandler';
import amazonApiRoutes from './routes/amazonApi';

function initialiseRoutes(app) {
    app.use(validateApiKey);

    app.use('/api/apa', amazonApiRoutes);
    app.get('/api/bot/:id', amazonApi.amazonApi);

    app.get('/', (request, response) => {
        response.json({});
    });

    app.use(notFoundHandler);
    app.use(defaultErrorHandler);
}

export default initialiseRoutes;
