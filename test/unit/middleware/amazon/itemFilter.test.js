import itemFilter from '../../../../src/middleware/amazon/itemFilter';
import * as amazonItemFilter from '../../../../src/services/amazonPrivateApi';
import * as amazonApi from '../../../../src/services/amazon';

describe('Amazon itemFilter', () => {
    let fakeRequest;
    let fakeResponse;
    let spyNext;
    let stubAmazonItemFilter;
    let stubAmazonItemLookup;

    const defaultItemFilterResponse = {
        asins: ['defaultAsin1', 'defaultAsin2']
    };

    beforeEach(() => {
        // TODO : Use fake http request when I've got wifi!
        fakeRequest = {query: {}};
        fakeResponse = {
            json: () => {},
            locals: {},
            status: () => {}
        };

        spyNext = sinon.spy();
        stubAmazonItemFilter = sinon
            .stub(amazonItemFilter, 'default')
            .resolves(defaultItemFilterResponse);
        stubAmazonItemLookup = sinon.stub(amazonApi, 'itemLookup');
    });

    afterEach(() => {
        stubAmazonItemFilter.restore();
        stubAmazonItemLookup.restore();
    });

    it('should call amazonItemFilter service with default age group if not passed', () => {
        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[0]).to.equal('adult-male');
    });

    it('should call amazonItemFilter service with given age group if passed', () => {
        const givenAgeGroup = 'givenAgeGroup';
        fakeRequest.query.agegroup = givenAgeGroup;

        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[0]).to.equal(givenAgeGroup);
    });

    it('should call amazonItemFilter service with default page if not passed', () => {
        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[1]).to.equal(0);
    });

    it('should call amazonItemFilter service with given page if passed', () => {
        const givenPage = 99;
        fakeRequest.query.page = givenPage;

        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[1]).to.equal(givenPage);
    });

    it('should call amazonItemFilter service with default size if not passed', () => {
        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[2]).to.equal(10);
    });

    it('should call amazonItemFilter service with given size if passed', () => {
        const givenSize = 99;
        fakeRequest.query.size = givenSize;

        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[2]).to.equal(givenSize);
    });

    it('should call amazonItemFilter service with default interests if not passed', () => {
        itemFilter(fakeRequest, fakeResponse, spyNext);

        // eslint-disable-next-line no-unused-expressions
        expect(stubAmazonItemFilter.getCall(0).args[3]).to.be.undefined;
    });

    it('should call amazonItemFilter service with given interests if passed', () => {
        const givenInterests = 'given interests';
        fakeRequest.query.interests = givenInterests;

        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[3]).to.equal(
            givenInterests
        );
    });
});
