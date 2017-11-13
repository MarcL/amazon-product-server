import logger from '../../logger';
import notFound from '../../botResponses';

const apiFailure = (error, response) => {
    logger.error(error.message);

    return response.json(notFound());
};

const apiSuccess = (data, apiType, response, next) => {
    response.locals.apiType = apiType;
    response.locals.apiResponse = data;
    next();
};

export {apiFailure, apiSuccess};
