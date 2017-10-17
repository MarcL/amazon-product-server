import {gallery} from '../transformers/chatfuel';
import {itemsFromAmazonResponse} from '../parsers/amazon';

const formatResponse = (request, response) => {
    const {format} = request.query;
    const {apiResponse} = response.locals;

    const data =
        format === 'facebook'
            ? gallery(itemsFromAmazonResponse(apiResponse))
            : apiResponse;

    response.json(data);
};

export default formatResponse;
