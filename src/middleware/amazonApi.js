import * as api from '../services/amazon';

const itemSearch = (request, response) => {
    const {keywords} = request.params;

    api
        .itemSearch(keywords)
        .then(amazonResponse => response.json(amazonResponse))
        .catch(error => console.error(error.message));
};

const browseNodeLookup = (request, response) => {
    const {id} = request.params;

    api
        .browseNodeLookup(id)
        .then(amazonResponse => response.json(amazonResponse))
        .catch(error => console.error(error.message));
};

const itemLookup = (request, response) => {
    const {asin} = request.params;

    api
        .itemLookup(asin)
        .then(amazonResponse => response.json(amazonResponse))
        .catch(error => console.error(error.message));
};

export {browseNodeLookup, itemLookup, itemSearch};
