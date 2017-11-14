import httpMocks from 'node-mocks-http';
import requestInformation from '../../../src/middleware/requestInformation';

describe('requestInformation', () => {
    let fakeRequest;
    let fakeResponse;
    let spyNext;

    const defaultProtocol = 'http';
    const defaultHostname = 'defaulthostname.com';

    beforeEach(() => {
        fakeRequest = httpMocks.createRequest();
        fakeRequest.protocol = defaultProtocol;
        fakeRequest.hostname = defaultHostname;

        fakeResponse = httpMocks.createResponse();
        fakeResponse.locals = {};

        fakeResponse = {locals: {}};
        spyNext = sinon.spy();
    });

    it('should set response baseUrl with expected protocol', () => {
        const givenProtocol = 'givenProtocol';
        fakeRequest.protocol = givenProtocol;
        requestInformation(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.baseUrl).to.contain(givenProtocol);
    });

    it('should set response baseUrl with expected hostname', () => {
        const givenHostname = 'givenHostname.com';
        fakeRequest.hostname = givenHostname;
        requestInformation(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.baseUrl).to.contain(givenHostname);
    });

    it('should call next middleware', () => {
        requestInformation(fakeRequest, fakeResponse, spyNext);

        expect(spyNext).to.have.been.calledWithExactly();
    });
});
