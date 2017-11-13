import validateApiKey from './middleware/validateApiKey';
import requestInformation from './middleware/requestInformation';
import notFoundHandler from './middleware/notFoundHandler';
import defaultErrorHandler from './middleware/defaultErrorHandler';
import determineAmazonLocale from './middleware/determineAmazonLocale';
import amazonApiRoutes from './routes/amazonApi';

function initialiseRoutes(app) {
    app.use(validateApiKey);
    app.use(requestInformation);
    app.use(determineAmazonLocale);

    app.use('/', amazonApiRoutes);

    app.use(notFoundHandler);
    app.use(defaultErrorHandler);
}

export default initialiseRoutes;
