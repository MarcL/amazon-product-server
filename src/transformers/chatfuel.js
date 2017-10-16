const text = message => {
    const messageList = Array.isArray(message) ? message : [message];
    const messages = messageList.map(text => {
        return {text};
    });

    return {
        messages
    };
};

function image(url, text) {
    return {
        messages: [
            {
                attachment: {
                    type: 'image',
                    payload: {
                        url
                    }
                }
            },
            {text}
        ]
    };
}

function galleryElement(item) {
    const {title, url, imageUrl} = item;
    return {
        title,
        image_url: imageUrl,
        subtitle: title, // TODO: Add subtitle?
        buttons: [
            {
                type: 'web_url',
                url,
                title: 'View Present'
            }
        ]
    };
}

function gallery(simpleAmazonItemList) {
    try {
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
    } catch (error) {
        return {};
    }
}

export {text, gallery, image};
