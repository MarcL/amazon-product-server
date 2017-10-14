import validateApiKey from './middleware/validateApiKey';
import amazonApi from './middleware/amazonApi';
import notFoundHandler from './middleware/notFoundHandler';
import defaultErrorHandler from './middleware/defaultErrorHandler';

function initialiseRoutes(app) {
    app.use(validateApiKey);

    app.get('/api/gifts/:ageGroup', amazonApi);

    app.get('/', (request, response) => {
        response.json({});
    });

    app.use(notFoundHandler);
    app.use(defaultErrorHandler);
}

export default initialiseRoutes;
