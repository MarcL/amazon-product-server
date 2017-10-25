import * as api from '../services/amazon';
import logger from '../logger';

const apiSuccess = (data, apiType, response, next) => {
    response.locals.apiType = apiType;
    response.locals.apiResponse = data;
    next();
};

const itemSearch = (request, response, next) => {
    const {keywords, index} = request.query;

    api
        .itemSearch(keywords, index)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemSearch', response, next)
        )
        .catch(error => logger.error(error.message));
};

const browseNodeLookup = (request, response, next) => {
    const {id} = request.params;

    api
        .browseNodeLookup(id)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'BrowseNodeLookup', response, next)
        )
        .catch(error => logger.error(error.message));
};

const itemLookup = (request, response, next) => {
    const {asin} = request.params;

    api
        .itemLookup(asin)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemLookup', response, next)
        )
        .catch(error => logger.error(error.message));
};

const similarityLookup = (request, response, next) => {
    const {asin} = request.query;

    api
        .similarityLookup(asin)
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'SimilarityLookup', response, next)
        )
        .catch(error => logger.error(error.message));
};

export {browseNodeLookup, itemLookup, itemSearch, similarityLookup};
