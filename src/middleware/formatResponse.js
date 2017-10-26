import {gallery} from '../transformers/chatfuel';
import {itemsFromAmazonResponse} from '../parsers/amazon';

const formatResponse = (request, response) => {
    const {format} = request.query;
    const {apiResponse, apiType} = response.locals;

    const data =
        format === 'chatfuel'
            ? gallery(itemsFromAmazonResponse(apiResponse, apiType))
            : apiResponse;

    response.json(data);
};

export default formatResponse;
