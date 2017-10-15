const getImageUrl = item => {
    if (item.MediumImage) {
        return item.MediumImage.URL;
    } else if (item.SmallImage.URL) {
        return item.MediumImage.URL;
    }

    return 'http://http://lorempixel.com/500/500/';
};

const parseItem = item => {
    return {
        asin: item.ASIN,
        url: item.DetailPageURL,
        imageUrl: getImageUrl(item),
        title: item.ItemAttributes.Title
    };
};

export {parseItem};
