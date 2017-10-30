import determineAmazoneLocale from '../../../src/middleware/determineAmazonLocale';

describe('determineAmazoneLocale', () => {
    let fakeRequest;
    let fakeResponse;
    let spyNext;

    beforeEach(() => {
        // TODO : Use fake http request when I've got wifi!
        fakeRequest = {query: {}};
        fakeResponse = {locals: {}};
        spyNext = sinon.spy();
    });

    it('should set Amazon local to UK if no locale query parameter is passed', () => {
        determineAmazoneLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('UK');
    });

    it('should set Amazon local to UK if locale query parameter is en_GB', () => {
        fakeRequest.query.locale = 'en_GB';
        determineAmazoneLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('UK');
    });

    it('should set Amazon local to US if locale query parameter is not en_GB', () => {
        fakeRequest.query.locale = 'en_notGB';
        determineAmazoneLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('US');
    });

    it('should set Amazon local to UK if locale query parameter is en_gb', () => {
        fakeRequest.query.locale = 'en_gb';
        determineAmazoneLocale(fakeRequest, fakeResponse, spyNext);

        expect(fakeResponse.locals.amazonLocale).to.equal('UK');
    });

    it('should call next middleware', () => {
        determineAmazoneLocale(fakeRequest, fakeResponse, spyNext);

        expect(spyNext).to.have.been.calledWithExactly();
    });
});
