import logger from '../logger';

function validateKey(request, response, next) {
    if (request.query.key !== process.env.API_KEY) {
        logger.error('Invalid API key');
        return response.status(401).json({});
    }

    return next();
}

export default validateKey;
