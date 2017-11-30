import * as cache from '../cache';
import logger from '../logger';
import itemLookup from './amazon/itemLookup';
import asinArrayToCommaSeparatedList from './asinList';
import createOperationHelper from './operationHelper';

// TODO : Should be called from outside this code
import validateSearchIndex from '../validators/amazonSearchIndex';

function itemSearch(
    keywords,
    index = 'All',
    responseGroup = 'Medium',
    locale = 'UK'
) {
    const operationHelper = createOperationHelper(locale);

    const searchIndex = validateSearchIndex(index);

    const cacheKeyName = cache.key([
        'ItemSearch',
        keywords,
        searchIndex,
        responseGroup,
        locale
    ]);

    const cachedData = cache.get(cacheKeyName);
    if (cachedData) {
        logger.info(`Retrieving from cache : ${cacheKeyName}`);
        return Promise.resolve(cachedData);
    }

    return operationHelper
        .execute('ItemSearch', {
            SearchIndex: searchIndex,
            Keywords: keywords,
            ResponseGroup: responseGroup
        })
        .then(response => {
            logger.info(`Saving to cache : ${cacheKeyName}`);
            cache.set(cacheKeyName, response.result);
            return response.result;
        });
}

const similarityLookup = (
    asin,
    similarityType = 'Intersection',
    responseGroup = 'Medium',
    locale = 'UK'
) => {
    const itemAsinList = asinArrayToCommaSeparatedList(asin);

    const operationHelper = createOperationHelper(locale);

    const cacheKeyName = cache.key([
        'SimilaritySearch',
        itemAsinList,
        similarityType,
        responseGroup,
        locale
    ]);

    const cachedData = cache.get(cacheKeyName);
    if (cachedData) {
        logger.info(`Retrieving from cache : ${cacheKeyName}`);
        return Promise.resolve(cachedData);
    }

    return operationHelper
        .execute('SimilarityLookup', {
            ItemId: itemAsinList,
            SimilarityType: similarityType,
            ResponseGroup: responseGroup
        })
        .then(response => {
            logger.info(`Saving to cache : ${cacheKeyName}`);
            cache.set(cacheKeyName, response.result);
            return response.result;
        });
};

const validateAmazonResponse = result => result;

function browseNodeLookup(browseNodeId, responseGroup = 'TopSellers') {
    const operationHelper = createOperationHelper();

    return operationHelper
        .execute('BrowseNodeLookup', {
            BrowseNodeId: browseNodeId,
            ResponseGroup: responseGroup
        })
        .then(response => validateAmazonResponse(response.result));
}

export {browseNodeLookup, itemLookup, itemSearch, similarityLookup};
