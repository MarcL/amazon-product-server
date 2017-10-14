function hasValidCredentials() {
    return (
        process.env.AMAZON_KEY_ID &&
        process.env.AMAZON_SECRET_KEY &&
        process.env.AMAZON_ASSOCIATE_ID
    );
}
function amazonApi(request, response) {
    if (!hasValidCredentials()) {
        console.error('Invalid Amazon credentials');
        return response.status(500).json({});
    }

    response.json({amazon: true});
}

export default amazonApi;
