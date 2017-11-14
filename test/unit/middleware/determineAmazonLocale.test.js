import httpMocks from 'node-mocks-http';
import determineAmazonLocale from '../../../src/middleware/determineAmazonLocale';

describe('determineAmazonLocale', () => {
    let fakeRequest;
    let fakeResponse;
    let spyNext;

    beforeEach(() => {
        fakeRequest = httpMocks.createRequest();
        fakeResponse = httpMocks.createResponse();
        fakeResponse.locals = {};
        spyNext = sinon.spy();
    });

    it('should set Amazon local to UK if no locale query parameter is passed', () => {
        determineAmazonLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('UK');
    });

    it('should set Amazon local to UK if locale query parameter is en_GB', () => {
        fakeRequest.query.locale = 'en_GB';
        determineAmazonLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('UK');
    });

    it('should set Amazon local to US if locale query parameter is not en_GB', () => {
        fakeRequest.query.locale = 'en_notGB';
        determineAmazonLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('US');
    });

    it('should set Amazon local to UK if locale query parameter is en_gb', () => {
        fakeRequest.query.locale = 'en_gb';
        determineAmazonLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('UK');
    });

    it('should call next middleware', () => {
        determineAmazonLocale(fakeRequest, fakeResponse, spyNext);

        expect(spyNext).to.have.been.calledWithExactly();
    });
});
