import httpMocks from 'node-mocks-http';
import notFoundHandler from '../../../src/middleware/notFoundHandler';
import notFound from '../../../src/botResponses';

describe('notFoundHandler', () => {
    let fakeRequest;
    let fakeResponse;
    let stubResponseJson;
    let stubResponseStatus;

    beforeEach(() => {
        fakeRequest = httpMocks.createRequest();
        fakeResponse = httpMocks.createResponse();
        fakeResponse.locals = {};

        stubResponseJson = sinon.stub(fakeResponse, 'json');
        stubResponseStatus = sinon
            .stub(fakeResponse, 'status')
            .returns(fakeResponse);
    });

    it('should set a 404 HTTP status code', () => {
        notFoundHandler(fakeRequest, fakeResponse);

        expect(stubResponseStatus).to.have.been.calledWithExactly(404);
    });

    it('should return expected error JSON response', () => {
        notFoundHandler(fakeRequest, fakeResponse);

        expect(stubResponseJson).to.have.been.calledWithExactly(notFound());
    });
});
