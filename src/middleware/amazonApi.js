import * as api from '../services/amazon';
import logger from '../logger';
import {notFound} from '../botResponses';

const apiSuccess = (data, apiType, response, next) => {
    response.locals.apiType = apiType;
    response.locals.apiResponse = data;
    next();
};

const apiFailure = (error, response) => {
    logger.error(error.message);

    return response.json(notFound);
};

const itemSearch = (request, response, next) => {
    const {keywords, index} = request.query;

    api
        .itemSearch(keywords, index)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemSearch', response, next)
        )
        .catch(error => apiFailure(error, response));
};

const browseNodeLookup = (request, response, next) => {
    const {id} = request.params;

    api
        .browseNodeLookup(id)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'BrowseNodeLookup', response, next)
        )
        .catch(error => apiFailure(error, response));
};

const itemLookup = (request, response, next) => {
    const {asin} = request.params;

    api
        .itemLookup(asin)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemLookup', response, next)
        )
        .catch(error => apiFailure(error, response));
};

const similarityLookup = (request, response, next) => {
    const {asin} = request.query;

    api
        .similarityLookup(asin)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'SimilarityLookup', response, next)
        )
        .catch(error => apiFailure(error, response));
};

export {browseNodeLookup, itemLookup, itemSearch, similarityLookup};
