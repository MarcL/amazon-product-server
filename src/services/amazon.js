import {OperationHelper} from 'apac';
import {parseItem} from '../parsers/amazon';

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
        locale
    });
};

function itemSearch(locale = 'UK') {
    const operationHelper = createOperationHelper(locale);

    return operationHelper
        .execute('ItemSearch', {
            SearchIndex: 'All',
            Keywords: 'Christmas',
            ResponseGroup: 'Offers,BrowseNodes'
        })
        .then(response => response.result)
        .catch(error => {
            console.error(error);
        });
}

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

function browseNodeLookup(browseNodeId, responseGroup = 'TopSellers') {
    const operationHelper = createOperationHelper();

    return operationHelper
        .execute('BrowseNodeLookup', {
            BrowseNodeId: browseNodeId,
            ResponseGroup: responseGroup
        })
        .then(response => response.result)
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
        .then(response => {
            // Parse items from response
            // TODO : Validate
            const itemList = response.ItemLookupResponse.Items.Item;
            return itemList.map(item => parseItem(item));
        })
        .catch(error => {
            console.error(error);
        });
}

export {browseNodeLookup, itemLookup, itemSearch};
