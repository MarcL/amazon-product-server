import {itemLookup} from '../../services/amazon';
import amazonItemFilter from '../../services/amazonPrivateApi';
import {apiSuccess} from './responses';
import {textMessage} from '../../transformers/chatfuel';
import logger from '../../logger';
import getLocaleData from '../../validLocales';

const itemFilter = (request, response, next) => {
    const {
        agegroup = 'adult-male',
        page = 0,
        size = 10,
        interests
    } = request.query;
    const {countryCode = 'us'} = request.query;

    const localeData = getLocaleData(countryCode);
    return amazonItemFilter(agegroup, page, size, interests, localeData)
        .then(apiResponse => {
            const asinList = apiResponse.asins.map(asin => asin.asin);
            if (asinList.length === 0) {
                throw new Error('No ASINs found');
            }

            return asinList;
        })
        .then(asins => itemLookup(asins, 'Medium', localeData.amazonLocale))
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemLookup', response, next)
        )
        .catch(error => {
            logger.error(error);
            const message =
                page > 0
                    ? "Santa can't find any more of that type of gift in his grotto."
                    : "Santa can't find that gift at the moment.";
            const notFoundResponse = textMessage(message);
            response.json(notFoundResponse);
        });
};

export default itemFilter;
