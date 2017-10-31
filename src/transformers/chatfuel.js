const singleMessage = content => ({text: content});

const textMessage = message => {
    const messageList = Array.isArray(message) ? message : [message];
    const messages = messageList.map(content => singleMessage(content));

    return {
        messages
    };
};

const imageAttachment = url => ({
    attachment: {
        type: 'image',
        payload: {
            url
        }
    }
});

const image = url => ({
    messages: [imageAttachment(url)]
});

const imageAndText = (url, content) => ({
    messages: [imageAttachment(url), singleMessage(content)]
});

const galleryElement = item => {
    const {title, url, imageUrl, features, price, asin} = item;
    return {
        title,
        image_url: imageUrl,
        subtitle: price || features[0] || title,
        buttons: [
            {
                type: 'web_url',
                url,
                title: 'Buy'
            },
            {
                set_attributes: {similarAsin: asin},
                type: 'show_block',
                block_names: ['SimilarPresents'],
                title: 'Similar gifts?'
            }
        ]
    };
};

const gallery = simpleAmazonItemList => {
    const elements = simpleAmazonItemList.map(item => galleryElement(item));
    return {
        messages: [
            {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements
                    }
                }
            }
        ]
    };
};

export {textMessage, gallery, image, imageAttachment, imageAndText};
