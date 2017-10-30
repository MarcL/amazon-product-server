import validateApiKey from '../../../src/middleware/validateApiKey';

describe('validateApiKey', () => {
    let fakeRequest;
    let fakeResponse;
    let stubResponseJson;
    let stubResponseStatus;
    let spyNext;
    let originalApiKey;

    beforeEach(() => {
        // TODO : Use fake http request when I've got wifi!
        fakeRequest = {query: {}};
        fakeResponse = {
            json: () => {},
            locals: {},
            status: () => {}
        };

        stubResponseJson = sinon.stub(fakeResponse, 'json');
        stubResponseStatus = sinon
            .stub(fakeResponse, 'status')
            .returns(fakeResponse);
        spyNext = sinon.spy();

        originalApiKey = process.env.API_KEY;
    });

    afterEach(() => {
        process.env.API_KEY = originalApiKey;
    });

    describe('when passed API key is valid', () => {
        beforeEach(() => {
            const validApiKey = 'validApiKey';
            fakeRequest.query.key = validApiKey;
            process.env.API_KEY = validApiKey;
        });

        it('should call next middleware', () => {
            validateApiKey(fakeRequest, fakeResponse, spyNext);

            expect(spyNext).to.have.been.calledWithExactly();
        });
    });

    describe('when passed API key is invalid', () => {
        it('should not call next middleware', () => {
            validateApiKey(fakeRequest, fakeResponse, spyNext);

            expect(spyNext).to.not.have.been.called;
        });

        it('should set a 401 HTTP status code', () => {
            validateApiKey(fakeRequest, fakeResponse);

            expect(stubResponseStatus).to.have.been.calledWithExactly(401);
        });

        it('should return expected blank JSON error response', () => {
            validateApiKey(fakeRequest, fakeResponse);

            expect(stubResponseJson).to.have.been.calledWithExactly({});
        });
    });
});
