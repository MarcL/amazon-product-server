import {OperationHelper} from 'apac';
import * as cache from '../../cache';
import logger from '../../logger';

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

const AMAZON_MAX_ITEM_IDS = 10;

const convertToCommaSeparatedList = asin => {
    const asinList = Array.isArray(asin) ? asin : [asin];

    if (asinList.length > AMAZON_MAX_ITEM_IDS) {
        throw new Error(
            'Amazon:ItemLookUp : Exceeded maximum number of ItemIds'
        );
    }
    return asinList.join(',');
};

function itemLookup(asin, responseGroup = 'Medium', locale = 'UK') {
    if (!asin) {
        throw new Error('Expected an ASIN or ASIN list');
    }
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

export default itemLookup;
