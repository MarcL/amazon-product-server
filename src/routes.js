import validateApiKey from './middleware/validateApiKey';
import requestInformation from './middleware/requestInformation';
import * as amazonApi from './middleware/amazonApi';
import notFoundHandler from './middleware/notFoundHandler';
import defaultErrorHandler from './middleware/defaultErrorHandler';
import localeToAmazonLocale from './middleware/facebook';
import amazonApiRoutes from './routes/amazonApi';

function initialiseRoutes(app) {
    app.use(validateApiKey);
    app.use(requestInformation);
    app.use(localeToAmazonLocale);

    app.use('/', amazonApiRoutes);

    app.use(notFoundHandler);
    app.use(defaultErrorHandler);
}

export default initialiseRoutes;
