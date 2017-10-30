import {notFound} from '../botResponses';

const notFoundHandler = (request, response) => {
    response.status(404).json(notFound());
};

export default notFoundHandler;
