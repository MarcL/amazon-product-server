import defaultErrorHandler from '../../../src/middleware/defaultErrorHandler';
import {notFound} from '../../../src/botResponses';

describe.only('defaultErrorHandler', () => {
    let fakeRequest;
    let fakeResponse;
    let stubResponseJson;
    let stubResponseStatus;

    const defaultError = new Error('defaultError');

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
    });

    it('should set a 500 HTTP status code', () => {
        defaultErrorHandler(defaultError, fakeRequest, fakeResponse);

        expect(stubResponseStatus).to.have.been.calledWithExactly(500);
    });

    it('should return expected error JSON response', () => {
        defaultErrorHandler(defaultError, fakeRequest, fakeResponse);

        expect(stubResponseJson).to.have.been.calledWithExactly(notFound());
    });
});
