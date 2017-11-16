import querystring from 'query-string';
import requestPromise from 'request-promise';
import logger from '../logger';
import * as cache from '../cache';

const createAmazonFilterUrl = (options, locale) => {
    const baseUrl =
        locale === 'UK' ? 'https://www.amazon.co.uk' : 'https://www.amazon.com';
    const filterUrl = `${baseUrl}/gcx/-/gfhz/api/filter`;

    const requestQueryString = querystring.stringify(options);

    return `${filterUrl}?${requestQueryString}`;
};

// Client-side API calls this - hackety hack
const itemFilter = (ageGroup, page, size, interests, locale = 'UK') => {
    const defaultFilterOptions = {
        isPrime: false,
        ageGroup: 'adult-male',
        page: 0,
        size: 10
    };

    const cacheKeyName = cache.key([
        'ItemFilter',
        ageGroup,
        page,
        size,
        interests,
        locale
    ]);

    const cachedData = cache.get(cacheKeyName);
    if (cachedData) {
        logger.info(`Retrieving from cache : ${cacheKeyName}`);
        return Promise.resolve(cachedData);
    }

    const urlInterests = interests ? interests.split(' ').join(',') : interests;
    const options = Object.assign({}, defaultFilterOptions, {
        ageGroup,
        page,
        size,
        interests: urlInterests || undefined
    });

    const amazonUrl = createAmazonFilterUrl(options, locale);

    const requestOptions = {
        uri: amazonUrl,
        json: true,
        headers: {
            Accepts: 'application/json',
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
        }
    };

    return requestPromise
        .get(requestOptions)
        .then(response => {
            logger.info(`Saving to cache : ${cacheKeyName}`);
            cache.set(cacheKeyName, response);
            return response;
        })
        .catch(error => {
            logger.error(error);
        });
};

export default itemFilter;
