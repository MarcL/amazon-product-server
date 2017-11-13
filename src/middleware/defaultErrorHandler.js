import logger from '../logger';
import notFound from '../botResponses';

// eslint-disable-next-line no-unused-vars
const defaultErrorHandler = (error, request, response, next) => {
    logger.error('Default error handler', {message: error.message});

    response.status(500).json(notFound());
};

export default defaultErrorHandler;
