import {OperationHelper} from 'apac';

const hasValidCredentials = () => {
    return (
        process.env.AMAZON_KEY_ID &&
        process.env.AMAZON_SECRET_KEY &&
        process.env.AMAZON_ASSOCIATE_ID
    );
};

function itemSearch(locale = 'UK') {
    if (!hasValidCredentials()) {
        throw new Error('Invalid Amazon credentials');
    }

    const {
        AMAZON_KEY_ID: awsId,
        AMAZON_SECRET_KEY: awsSecret,
        AMAZON_ASSOCIATE_ID: assocId
    } = process.env;

    const operationHelper = new OperationHelper({
        awsId,
        awsSecret,
        assocId,
        locale
    });

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

export default itemSearch;
