import * as cache from '../../cache';
import logger from '../../logger';
import createOperationHelper from '../operationHelper';
import asinArrayToCommaSeparatedList from '../asinList';

function itemLookup(asin, responseGroup = 'Medium', locale = 'UK') {
    if (!asin) {
        throw new Error('Expected an ASIN or ASIN list');
    }
    const itemAsinList = asinArrayToCommaSeparatedList(asin);
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
