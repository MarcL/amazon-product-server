import {notFound as notFoundBotResponse} from '../botResponses';

const notFoundHandler = (request, response) => {
    response.status(404).json(notFoundBotResponse());
};

export default notFoundHandler;
