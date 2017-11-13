import {
    apiFailure,
    apiSuccess
} from '../../../../src/middleware/amazon/responses';
import notFound from '../../../../src/botResponses';

describe('Amazon responses', () => {
    let fakeResponse;
    let stubResponseJson;

    beforeEach(() => {
        // TODO : Use fake http response when I've got wifi!
        fakeResponse = {
            json: () => {},
            locals: {},
            status: () => {}
        };

        stubResponseJson = sinon.stub(fakeResponse, 'json');
    });

    describe('apiFailure', () => {
        it('should call response.json with expected JSON', () => {
            apiFailure('error', fakeResponse);

            expect(stubResponseJson).to.have.been.calledWithExactly(notFound());
        });
    });

    describe('apiSuccess', () => {
        let spyNext;
        const defaultApiResponse = {default: 'data'};
        const defaultApiType = 'defaultApiType';

        beforeEach(() => {
            spyNext = sinon.spy();
        });

        it('should set response.locals with expected apiType', () => {
            const givenApiType = 'givenApiType';
            apiSuccess(defaultApiResponse, givenApiType, fakeResponse, spyNext);

            expect(fakeResponse.locals.apiType).to.equal(givenApiType);
        });

        it('should set response.locals with expected apiResponse', () => {
            const givenApiResponse = {given: 'data'};
            apiSuccess(givenApiResponse, defaultApiType, fakeResponse, spyNext);

            expect(fakeResponse.locals.apiResponse).to.equal(givenApiResponse);
        });

        it('should call next', () => {
            apiSuccess(
                defaultApiResponse,
                defaultApiType,
                fakeResponse,
                spyNext
            );

            // eslint-disable-next-line no-unused-expressions
            expect(spyNext).to.have.been.calledOnce;
        });
    });
});
