import {itemLookup} from '../../services/amazon';
import amazonItemFilter from '../../services/amazonPrivateApi';
import {apiFailure, apiSuccess} from './responses';

const itemFilter = (request, response, next) => {
    const {
        agegroup = 'adult-male',
        page = 0,
        size = 10,
        interests
    } = request.query;
    const {amazonLocale} = response.locals;

    amazonItemFilter(agegroup, page, size, interests, amazonLocale)
        .then(apiResponse => apiResponse.asins.map(asin => asin.asin))
        .then(asins => itemLookup(asins, 'Medium', amazonLocale))
        .then(amazonResponse =>
            apiSuccess(amazonResponse, 'ItemLookup', response, next)
        )
        .catch(error => apiFailure(error, response));
};

export default itemFilter;
