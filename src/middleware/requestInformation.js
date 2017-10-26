import url from 'url';

function requestInformation(request, response, next) {
    response.locals.baseUrl = url.format({
        protocol: request.protocol,
        host: request.hostname
    });

    return next();
}

export default requestInformation;
