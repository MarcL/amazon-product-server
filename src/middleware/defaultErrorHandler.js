import logger from '../logger';

// eslint-disable-next no-unused-vars
const defaultErrorHandler = (error, request, response, next) => {
    logger.error('Default error handler', {message: error.message});

    response.status(500).json({});
};

export default defaultErrorHandler;
