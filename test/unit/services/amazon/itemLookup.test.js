import itemLookup from '../../../../src/services/amazon/itemLookup';
import * as cache from '../../../../src/cache';
import * as operationHelper from '../../../../src/services/operationHelper';

describe('itemLookup', () => {
    let stubCacheGet;
    let stubOperationHelper;
    let stubOperationHelperExecute;
    const fakeAmazonResponse = {
        result: {}
    };
    let fakeOperationHelper;

    const defaultAsin = 'defaultAsin';
    const defaultResponseGroup = 'defaultResponseGroup';
    const defaultAmazonLocale = 'defaultAmazonLocale';
    const defaultCacheKey = `ItemLookup|${defaultAsin}|${
        defaultResponseGroup
    }|${defaultAmazonLocale}`;

    beforeEach(() => {
        stubOperationHelperExecute = sinon.stub().resolves(fakeAmazonResponse);
        fakeOperationHelper = {
            execute: stubOperationHelperExecute
        };

        stubCacheGet = sinon.stub(cache, 'get').returns();
        stubOperationHelper = sinon
            .stub(operationHelper, 'default')
            .returns(fakeOperationHelper);
    });

    afterEach(() => {
        stubCacheGet.restore();
        stubOperationHelper.restore();
    });

    it('should throw an error if no ASIN is passed', () => {
        const wrapper = () => itemLookup();

        expect(wrapper).to.throw('Expected an ASIN or ASIN list');
    });

    describe('if data is already cached', () => {
        const defaultCachedData = {
            ItemLookUpResponse: {}
        };

        beforeEach(() => {
            stubCacheGet.returns(defaultCachedData);
        });

        it('should call cache with expected key when single ASIN is passed', () =>
            itemLookup(
                defaultAsin,
                defaultResponseGroup,
                defaultAmazonLocale
            ).then(() => {
                expect(stubCacheGet).to.have.been.calledWithExactly(
                    defaultCacheKey
                );
            }));
        it('should call cache with expected key when multiple ASINs are passed', () => {
            const givenAsin1 = 'givenAsin1';
            const givenAsin2 = 'givenAsin2';
            const givenAsinList = [givenAsin1, givenAsin2];
            const expectedCacheKey = `ItemLookup|${givenAsin1},${givenAsin2}|${
                defaultResponseGroup
            }|${defaultAmazonLocale}`;
            return itemLookup(
                givenAsinList,
                defaultResponseGroup,
                defaultAmazonLocale
            ).then(() => {
                expect(stubCacheGet).to.have.been.calledWithExactly(
                    expectedCacheKey
                );
            });
        });

        it('should not call operation helper', () =>
            itemLookup(defaultAsin).then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(stubOperationHelper).to.not.have.been.called;
            }));

        it('should resolve with cached data', () =>
            itemLookup(defaultAsin).then(response => {
                expect(response).to.equal(defaultCachedData);
            }));
    });

    describe('if data is not cached', () => {
        it('should call operation helper with given Locale', () => {
            const givenLocale = 'givenLocale';

            return itemLookup(
                defaultAsin,
                defaultResponseGroup,
                givenLocale
            ).then(() => {
                expect(stubOperationHelper).to.have.been.calledWith(
                    givenLocale
                );
            });
        });

        it('should execute operation helper with expected Amazon command', () =>
            itemLookup(defaultAsin).then(() => {
                expect(stubOperationHelperExecute).to.have.been.calledWith(
                    'ItemLookup'
                );
            }));

        xit('should call operation helper with expected asin');
        it('should call operation helper with expected asin list');
        it('should call operation helper with expected response group');
        it('should call operation helper with expected locale');
        it('should cache expected operation helper data');
        it('should resolve with expected operation helper data');
    });
});
