function determineAmazonLocale(request, response, next) {
    const {locale = 'en_GB'} = request.query;

    // Only support UK or US for now
    response.locals.amazonLocale =
        locale.toLowerCase() === 'en_gb' ? 'UK' : 'US';

    next();
}

export default determineAmazonLocale;
