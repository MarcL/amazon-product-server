import * as api from '../services/amazon';
import logger from '../logger';
import notFound from '../botResponses';

const apiSuccess = (data, apiType, response, next) => {
    response.locals.apiType = apiType;
    response.locals.apiResponse = data;
    next();
};

const apiFailure = (error, response) => {
    logger.error(error.message);

    return response.json(notFound());
};

const DEFAULT_AMAZON_RESPONSE_GROUP = 'Medium';

const itemSearch = (request, response, next) => {
    const {keywords, index} = request.query;
    const {amazonLocale} = response.locals;

    api
        .itemSearch(
            keywords,
            index,
            DEFAULT_AMAZON_RESPONSE_GROUP,
            amazonLocale
        )
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemSearch', response, next)
        )
        .catch(error => apiFailure(error, response));
};

// TODO : Fix up
const browseNodeLookup = (request, response, next) => {
    const {id} = request.params;

    api
        .browseNodeLookup(id, 'TopSellers')
        .then(amazonResponse => {
            apiSuccess(amazonResponse, 'BrowseNodeLookup', response, next);
        })
        .catch(error => apiFailure(error, response));
};

// TODO : Fix up
const itemLookup = (request, response, next) => {
    const {asin} = request.params;

    api
        .itemLookup(asin, 'Medium,BrowseNodes')
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemLookup', response, next)
        )
        .catch(error => apiFailure(error, response));
};

const similarityLookup = (request, response, next) => {
    const {asin} = request.query;
    const {amazonLocale} = response.locals;

    api
        .similarityLookup(
            asin,
            'Intersection',
            DEFAULT_AMAZON_RESPONSE_GROUP,
            amazonLocale
        )
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'SimilarityLookup', response, next)
        )
        .catch(error => apiFailure(error, response));
};

export {browseNodeLookup, itemLookup, itemSearch, similarityLookup};
