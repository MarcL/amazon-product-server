import {OperationHelper} from 'apac';
import * as cache from '../cache';
import logger from '../logger';

// TODO : Should be called from outside this code
import validateSearchIndex from '../validators/amazonSearchIndex';

const AMAZON_MAX_ITEM_IDS = 10;

const hasValidCredentials = () =>
    process.env.AMAZON_KEY_ID &&
    process.env.AMAZON_SECRET_KEY &&
    process.env.AMAZON_ASSOCIATE_ID_UK &&
    process.env.AMAZON_ASSOCIATE_ID_US;

const createOperationHelper = (locale = 'UK') => {
    if (!hasValidCredentials()) {
        throw new Error('Invalid Amazon credentials');
    }

    const {
        AMAZON_KEY_ID: awsId,
        AMAZON_SECRET_KEY: awsSecret,
        AMAZON_ASSOCIATE_ID_UK: assocIdUk,
        AMAZON_ASSOCIATE_ID_US: assocIdUS
    } = process.env;

    // TODO : This is hacky - per locale config would be better
    const assocId = locale === 'UK' ? assocIdUk : assocIdUS;

    return new OperationHelper({
        awsId,
        awsSecret,
        assocId,
        locale,
        maxRequestsPerSecond: 1
    });
};

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

const convertToCommaSeparatedList = asin => {
    const asinList = Array.isArray(asin) ? asin : [asin];

    if (asinList.length > AMAZON_MAX_ITEM_IDS) {
        throw new Error(
            'Amazon:ItemLookUp : Exceeded maximum number of ItemIds'
        );
    }
    return asinList.join(',');
};

const similarityLookup = (
    asin,
    similarityType = 'Intersection',
    responseGroup = 'Medium',
    locale = 'UK'
) => {
    const itemAsinList = convertToCommaSeparatedList(asin);

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

function itemLookup(asin, responseGroup = 'Medium', locale = 'UK') {
    const itemAsinList = convertToCommaSeparatedList(asin);
    const cacheKeyName = cache.key([
        'ItemLookup',
        itemAsinList,
        responseGroup,
        locale
    ]);

    const cachedData = cache.get(cacheKeyName);
    if (cachedData) {
        logger.info(`Retrieving from cache : ${cacheKeyName}`);
        return Promise.resolve(cachedData);
    }

    const operationHelper = createOperationHelper(locale);

    return operationHelper
        .execute('ItemLookup', {
            ItemId: itemAsinList,
            ResponseGroup: responseGroup
        })
        .then(response => {
            logger.info(`Saving to cache : ${cacheKeyName}`);
            cache.set(cacheKeyName, response.result);

            return response.result;
        });
}

export {browseNodeLookup, itemLookup, itemSearch, similarityLookup};
