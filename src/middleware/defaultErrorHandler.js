// eslint-disable-next no-unused-vars
const defaultErrorHandler = (error, request, response, next) => {
    console.log(error.message);
    response.status(500).json({});
};

export default defaultErrorHandler;
