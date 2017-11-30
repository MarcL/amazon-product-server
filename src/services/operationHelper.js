import {OperationHelper} from 'apac';

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

export default createOperationHelper;
