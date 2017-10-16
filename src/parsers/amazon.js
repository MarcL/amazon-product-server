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
    return {
        asin: item.ASIN,
        url: item.DetailPageURL,
        imageUrl: getImageUrl(item),
        title: item.ItemAttributes.Title
    };
};

export {parseItem};
