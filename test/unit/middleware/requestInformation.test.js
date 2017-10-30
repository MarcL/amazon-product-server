import requestInformation from '../../../src/middleware/requestInformation';

describe.only('requestInformation', () => {
    let fakeRequest;
    let fakeResponse;
    let spyNext;

    const defaultProtocol = 'http';
    const defaultHostname = 'defaulthostname.com';

    beforeEach(() => {
        // TODO : Use fake http request when I've got wifi!
        fakeRequest = {
            query: {},
            protocol: defaultProtocol,
            hostname: defaultHostname
        };
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
