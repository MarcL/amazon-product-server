import itemLookup from '../../../../src/services/amazon/itemLookup';
import * as cache from '../../../../src/cache';
import * as operationHelper from '../../../../src/services/operationHelper';

describe('itemLookup', () => {
    let stubCacheGet;
    let stubCacheSet;
    let stubOperationHelper;
    let stubOperationHelperExecute;
    const fakeAmazonResponse = {
        ItemLookUpResponse: {}
    };
    const fakeOperationHelperResponse = {
        result: fakeAmazonResponse
    };
    let fakeOperationHelper;

    const defaultAsin = 'defaultAsin';
    const defaultResponseGroup = 'defaultResponseGroup';
    const defaultAmazonLocale = 'defaultAmazonLocale';
    const defaultCacheKey = `ItemLookup|${defaultAsin}|${
        defaultResponseGroup
    }|${defaultAmazonLocale}`;

    beforeEach(() => {
        stubOperationHelperExecute = sinon
            .stub()
            .resolves(fakeOperationHelperResponse);
        fakeOperationHelper = {
            execute: stubOperationHelperExecute
        };

        stubCacheGet = sinon.stub(cache, 'get').returns();
        stubCacheSet = sinon.stub(cache, 'set');
        stubOperationHelper = sinon
            .stub(operationHelper, 'default')
            .returns(fakeOperationHelper);
    });

    afterEach(() => {
        stubCacheGet.restore();
        stubCacheSet.restore();
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

        it('should call operation helper with expected asin', () => {
            const expectedOptions = {
                ItemId: defaultAsin,
                ResponseGroup: defaultResponseGroup
            };
            return itemLookup(defaultAsin, defaultResponseGroup).then(() => {
                expect(stubOperationHelperExecute).to.have.been.calledWith(
                    'ItemLookup',
                    expectedOptions
                );
            });
        });

        it('should call operation helper with expected asin list', () => {
            const givenAsinList = ['asin1', 'asin2', 'asin3'];
            const expectedOptions = {
                ItemId: givenAsinList.join(','),
                ResponseGroup: defaultResponseGroup
            };
            return itemLookup(givenAsinList, defaultResponseGroup).then(() => {
                expect(stubOperationHelperExecute).to.have.been.calledWith(
                    'ItemLookup',
                    expectedOptions
                );
            });
        });

        it('should call operation helper with expected response group', () => {
            const givenResponseGroup = 'givenResponseGroup';
            const expectedOptions = {
                ItemId: defaultAsin,
                ResponseGroup: givenResponseGroup
            };

            return itemLookup(defaultAsin, givenResponseGroup).then(() => {
                expect(stubOperationHelperExecute).to.have.been.calledWith(
                    'ItemLookup',
                    expectedOptions
                );
            });
        });

        it('should cache expected operation helper data', () => {
            const expectedCacheKey = cache.key([
                'ItemLookup',
                defaultAsin,
                defaultResponseGroup,
                defaultAmazonLocale
            ]);
            return itemLookup(
                defaultAsin,
                defaultResponseGroup,
                defaultAmazonLocale
            ).then(() => {
                expect(stubCacheSet).to.have.been.calledWith(
                    expectedCacheKey,
                    fakeAmazonResponse
                );
            });
        });

        it('should resolve with expected operation helper data', () =>
            itemLookup(defaultAsin).then(response => {
                expect(response).to.deep.equal(fakeAmazonResponse);
            }));
    });
});
