const singleMessage = content => {
    return {text: content};
};

const text = message => {
    const messageList = Array.isArray(message) ? message : [message];
    const messages = messageList.map(text => singleMessage(content));

    return {
        messages
    };
};

const imageAttachment = url => {
    return {
        attachment: {
            type: 'image',
            payload: {
                url
            }
        }
    };
};

const image = url => {
    return {
        messages: [imageAttachment(url)]
    };
};

const imageAndText = (url, content) => {
    return {
        messages: [imageAttachment(url), singleMessage(content)]
    };
};

const galleryElement = item => {
    const {title, url, imageUrl, features, price} = item;
    return {
        title,
        image_url: imageUrl,
        subtitle: price || features[0] || title,
        buttons: [
            {
                type: 'web_url',
                url,
                title: 'Buy'
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

export {text, gallery, image, imageAttachment, imageAndText};
