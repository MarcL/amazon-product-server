import get from 'lodash.get';

const getImageUrl = item => {
    if (item.LargeImage) {
        return item.LargeImage.URL;
    } else if (item.MediumImage) {
        return item.MediumImage.URL;
    } else if (item.SmallImage) {
        return item.SmallImage.URL;
    }

    return 'http://http://lorempixel.com/500/500/';
};

const parseItem = item => {
    const {ItemAttributes: itemAttributes} = item;
    return {
        asin: item.ASIN,
        url: item.DetailPageURL,
        imageUrl: getImageUrl(item),
        title: itemAttributes.Title,
        price: itemAttributes.ListPrice.FormattedPrice,
        features: itemAttributes.Feature
    };
};

const isAvailable = item => {
    const listPrice = get(item, 'ItemAttributes.ListPrice.FormattedPrice');
    const totalNew = get(item, 'OfferSummary.TotalNew');
    return listPrice || totalNew;
};

const itemsFromAmazonResponse = (
    amazonResponse,
    apiType = 'ItemSearchResponse'
) => {
    const itemList = get(amazonResponse, `${apiType}Response.Items.Item`, []);
    const finalItemList = Array.isArray(itemList) ? itemList : [itemList];
    return finalItemList.filter(isAvailable).map(item => parseItem(item));
};

export {itemsFromAmazonResponse, parseItem};
