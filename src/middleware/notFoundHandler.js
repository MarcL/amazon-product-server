const notFoundHandler = (request, response) => {
    throw new Error('Madness');
    response.status(404).json({});
};

export default notFoundHandler;
