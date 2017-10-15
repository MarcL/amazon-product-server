const ELF_NO_GIF = 'https://media.giphy.com/media/MhVdjqeKACHmM/giphy.gif';

const chatfuelText = message => {
    const messageList = Array.isArray(message) ? message : [message];
    const messages = messageList.map(text => {
        return {text};
    });

    return {
        messages
    };
};

const chatfuelImage = (url, text) => {
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
};

const chatfuelGalleryElement = item => {
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
};

const chatfuelGallery = simpleAmazonItemList => {
    try {
        const elements = simpleAmazonItemList.map(item =>
            chatfuelGalleryElement(item)
        );
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
        return chatfuelImage(
            ELF_NO_GIF,
            "🎁 Oops! I'm having trouble finding that!"
        );
    }
};

export {chatfuelText, chatfuelGallery, chatfuelImage};
