import {OperationHelper} from 'apac';
import cache from '../cache';
import logger from '../logger';

const AMAZON_MAX_ITEM_IDS = 10;

const hasValidCredentials = () => {
    return (
        process.env.AMAZON_KEY_ID &&
        process.env.AMAZON_SECRET_KEY &&
        process.env.AMAZON_ASSOCIATE_ID
    );
};

const createOperationHelper = (locale = 'UK') => {
    if (!hasValidCredentials()) {
        throw new Error('Invalid Amazon credentials');
    }

    const {
        AMAZON_KEY_ID: awsId,
        AMAZON_SECRET_KEY: awsSecret,
        AMAZON_ASSOCIATE_ID: assocId
    } = process.env;

    return new OperationHelper({
        awsId,
        awsSecret,
        assocId,
        locale,
        maxRequestsPerSecond: 1
    });
};

const validateSearchIndex = index => {
    const validSearchIndexNames = [
        'All',
        'Apparel',
        'Appliances',
        'Automotive',
        'Baby',
        'Beauty',
        'Blended',
        'Books',
        'Classical',
        'DVD',
        'Electronics',
        'Grocery',
        'HealthPersonalCare',
        'HomeGarden',
        'HomeImprovement',
        'Jewelry',
        'KindleStore',
        'Kitchen',
        'Lighting',
        'Marketplace',
        'MP3Downloads',
        'Music',
        'MusicTracks',
        'MusicalInstruments',
        'OfficeProducts',
        'OutdoorLiving',
        'Outlet',
        'PetSupplies',
        'PCHardware',
        'Shoes',
        'Software',
        'SoftwareVideoGames',
        'SportingGoods',
        'Tools',
        'Toys',
        'VHS',
        'Video',
        'VideoGames',
        'Watches'
    ];

    const validIndex = validSearchIndexNames.filter(
        indexName => indexName.toLowerCase() === index.toLowerCase()
    );

    return validIndex.length ? validIndex : 'All';
};

const createCacheKey = dataList => {
    return dataList.join('|');
};

function itemSearch(
    keywords,
    index = 'All',
    responseGroup = 'Medium',
    locale = 'UK'
) {
    const operationHelper = createOperationHelper(locale);

    const searchIndex = validateSearchIndex(index);

    const cacheKeyName = createCacheKey([
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
        })
        .catch(error => {
            console.error(error);
        });
}

const similarityLookup = (
    asin,
    similarityType = 'Intersection',
    responseGroup = 'Medium',
    locale = 'UK'
) => {
    const asinList = Array.isArray(asin) ? asin : [asin];

    if (asinList.length > AMAZON_MAX_ITEM_IDS) {
        throw new Error(
            'Amazon:ItemLookUp : Exceeded maximum number of ItemIds'
        );
    }
    const itemAsinList = asinList.join(',');

    const operationHelper = createOperationHelper(locale);

    const cacheKeyName = createCacheKey([
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
        })
        .catch(error => {
            console.error(error);
        });
};

// https://www.amazon.co.uk/gcx/Gifts-for-Women/gfhz/ref=s9_acss_bw_cg_CSMAINC_2b1_w?
// ageGroup=adult-female&
// interests=unique&
// pf_rd_i=11180296031&
// pf_rd_m=A3P5ROKL5A1OLE&
// pf_rd_p=569&
// pf_rd_r=QPC7231219NSRJV3TYB0&
// pf_rd_s=merchandised-search-3&
// pf_rd_t=101&
// showBubbles=false

// ageGroup
// - adult-neutral
// - adult-female
// - adult-male
// - teen-neutral
// - kid8-neutral
// - kid4-neutral
// - baby-neutral
// - pet-neutral

// Christmas browsenode (UK) 11180296031

const validateAmazonResponse = result => {
    return result;
};

function browseNodeLookup(browseNodeId, responseGroup = 'TopSellers') {
    const operationHelper = createOperationHelper();

    return operationHelper
        .execute('BrowseNodeLookup', {
            BrowseNodeId: browseNodeId,
            ResponseGroup: responseGroup
        })
        .then(response => validateAmazonResponse(response.result))
        .catch(error => {
            console.error(error);
        });
}

function itemLookup(asin, responseGroup = 'Medium') {
    const asinList = Array.isArray(asin) ? asin : [asin];

    if (asinList.length > AMAZON_MAX_ITEM_IDS) {
        throw new Error(
            'Amazon:ItemLookUp : Exceeded maximum number of ItemIds'
        );
    }
    const itemAsinList = asinList.join(',');

    const operationHelper = createOperationHelper();

    return operationHelper
        .execute('ItemLookup', {
            ItemId: itemAsinList,
            ResponseGroup: responseGroup
        })
        .then(response => response.result)
        .catch(error => {
            console.error(error);
        });
}

export {browseNodeLookup, itemLookup, itemSearch, similarityLookup};
