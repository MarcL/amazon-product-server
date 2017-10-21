import * as api from '../services/amazon';

const itemSearch = (request, response, next) => {
    const {keywords, index} = request.query;

    api
        .itemSearch(keywords, index)
        .then(amazonResponse => {
            response.locals.apiResponse = amazonResponse;
            next();
        })
        .catch(error => console.error(error.message));
};

const browseNodeLookup = (request, response, next) => {
    const {id} = request.params;

    api
        .browseNodeLookup(id)
        .then(amazonResponse => {
            response.locals.apiResponse = amazonResponse;
            next();
        })
        .catch(error => console.error(error.message));
};

const itemLookup = (request, response, next) => {
    const {asin} = request.params;

    api
        .itemLookup(asin)
        .then(amazonResponse => {
            response.locals.apiResponse = amazonResponse;
            next();
        })
        .catch(error => console.error(error.message));
};

export {browseNodeLookup, itemLookup, itemSearch};
