import validateApiKey from './middleware/validateApiKey';
import amazonApi from './middleware/amazonApi';

function initialiseRoutes(app) {
    app.use(validateApiKey);

    app.get('/api/', amazonApi);

    app.get('/', (request, response) => {
        response.json({});
    });
}

export default initialiseRoutes;
