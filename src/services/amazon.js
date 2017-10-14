import {OperationHelper} from 'apac';

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
            SearchIndex: 'Books',
            Keywords: 'Harry Potter',
            ResponseGroup: 'ItemAttributes,Offers'
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

function browseNodes() {
    const operationHelper = createOperationHelper();

    return operationHelper
        .execute('ItemSearch', {
            SearchIndex: 'Books',
            Keywords: 'Christmas',
            ResponseGroup: 'BrowseNodes'
        })
        .then(response => response.result)
        .catch(error => {
            console.error(error);
        });
}

export {browseNodes, itemSearch};
