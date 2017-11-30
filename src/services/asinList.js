const AMAZON_MAX_ASINS = 10;

const asinArrayToCommaSeparatedList = asin => {
    if (!asin) {
        throw new Error('Missing asin number(s)');
    }

    const asinList = Array.isArray(asin) ? asin : [asin];

    if (asinList.length > AMAZON_MAX_ASINS) {
        throw new Error('Exceeded maximum permitted Amazon ASINs');
    }
    return asinList.join(',');
};

export default asinArrayToCommaSeparatedList;
