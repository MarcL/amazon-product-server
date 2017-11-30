import {OperationHelper} from 'apac';
import * as cache from '../../cache';
import logger from '../../logger';
import asinArrayToCommaSeparatedList from '../asinList';

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

export default similarityLookup;
