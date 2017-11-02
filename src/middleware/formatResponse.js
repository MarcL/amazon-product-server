import {gallery} from '../transformers/chatfuel';
import {itemsFromAmazonResponse} from '../parsers/amazon';
import {notFound} from '../botResponses';

const noItemsResponse = notFound();

const validItemsJson = (apiResponse, apiType) => {
    const items = itemsFromAmazonResponse(apiResponse, apiType);
    return items.length > 0 ? gallery(items) : noItemsResponse;
};

const formatResponse = (request, response) => {
    const {format} = request.query;
    const {apiResponse, apiType} = response.locals;

    const responseData =
        format === 'chatfuel'
            ? validItemsJson(apiResponse, apiType)
            : apiResponse;

    response.json(responseData);
};

export default formatResponse;
