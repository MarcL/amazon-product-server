import url from 'url';

function localeToAmazonLocale(request, response, next) {
    const {locale = 'en_GB'} = request.query;

    // Only support UK or US for now
    response.locals.amazonLocale = locale === 'en_GB' ? 'UK' : 'US';

    return next();
}

export default localeToAmazonLocale;
