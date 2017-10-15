const chatFuelGalleryElement = item => {
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

const gallery = simpleAmazonItemList => {
    const elements = simpleAmazonItemList.map(item =>
        chatFuelGalleryElement(item)
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
};

export {gallery};
