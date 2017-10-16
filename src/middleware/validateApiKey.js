function validateKey(request, response, next) {
    if (request.query.key !== process.env.API_KEY) {
        console.log('invalid key');
        return response.status(401).json({});
    }

    return next();
}

export default validateKey;
