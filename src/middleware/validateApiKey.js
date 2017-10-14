function validateKey(request, response, next) {
    if (request.query.key !== process.env.API_KEY) {
        return response.status(401).json({});
    }

    next();
}

export default validateKey;
