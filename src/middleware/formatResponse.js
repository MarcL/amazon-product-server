import {gallery} from '../transformers/chatfuel';
import {itemsFromAmazonResponse} from '../parsers/amazon';
import {notFound} from '../botResponses';

const noItemsResponse = notFound();

const validItemsJson = (apiResponse, items, format) =>
    format === 'chatfuel' ? gallery(items) : apiResponse;

const formatResponse = (request, response) => {
    const {format} = request.query;
    const {apiResponse, apiType} = response.locals;

    const items = itemsFromAmazonResponse(apiResponse, apiType);
    const data =
        items.length > 0
            ? validItemsJson(apiResponse, items, format)
            : noItemsResponse;

    response.json(data);
};

export default formatResponse;
