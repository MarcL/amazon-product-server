import httpMocks from 'node-mocks-http';
import itemFilter from '../../../../src/middleware/amazon/itemFilter';
import * as amazonItemFilter from '../../../../src/services/amazonPrivateApi';
import * as amazonApi from '../../../../src/services/amazon';
import * as apiResponses from '../../../../src/middleware/amazon/responses';
import {textMessage} from '../../../../src/transformers/chatfuel';
import getLocaleData from '../../../../src/validLocales';

describe('Amazon itemFilter', () => {
    let fakeRequest;
    let fakeResponse;
    let spyNext;
    let stubAmazonItemFilter;
    let stubAmazonItemLookup;
    let stubApiSuccessResponse;
    let stubResponseJson;

    const defaultItemFilterResponse = {
        asins: ['defaultAsin1', 'defaultAsin2']
    };

    const defaultAmazonLocale = 'defaultAmazonLocale';

    beforeEach(() => {
        fakeRequest = httpMocks.createRequest();
        fakeResponse = httpMocks.createResponse();
        fakeResponse.locals = {
            amazonLocale: defaultAmazonLocale
        };

        spyNext = sinon.spy();
        stubAmazonItemFilter = sinon
            .stub(amazonItemFilter, 'default')
            .resolves(defaultItemFilterResponse);
        stubAmazonItemLookup = sinon.stub(amazonApi, 'itemLookup');
        stubApiSuccessResponse = sinon.stub(apiResponses, 'apiSuccess');
        stubResponseJson = sinon.stub(fakeResponse, 'json');
    });

    afterEach(() => {
        stubAmazonItemFilter.restore();
        stubAmazonItemLookup.restore();
        stubApiSuccessResponse.restore();
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

    it('should be called with expected locale data', () => {
        const givenCountryCode = 'uk';
        const expectedLocaleData = getLocaleData(givenCountryCode);
        fakeRequest.query.countryCode = givenCountryCode;

        itemFilter(fakeRequest, fakeResponse, spyNext);

        expect(stubAmazonItemFilter.getCall(0).args[4]).to.deep.equal(
            expectedLocaleData
        );
    });

    const createAsinItem = (asin, title) => ({
        asin,
        title,
        detailPageURI: 'defaultDetailPageURI'
    });

    describe('when itemFilter call succeeds', () => {
        it('should call itemLookup with expected parameters', () => {
            const givenCountryCode = 'uk';
            const expectedLocaleData = getLocaleData(givenCountryCode);
            fakeRequest.query.countryCode = givenCountryCode;

            const givenAsin1 = 'givenAsin1';
            const givenAsin2 = 'givenAsin2';
            const givenProduct1 = createAsinItem(givenAsin1, 'defaultTitle');
            const givenProduct2 = createAsinItem(givenAsin2, 'defaultTitle');
            const defaultSuccessData = {
                asins: [givenProduct1, givenProduct2],
                requestId: 'defaultRequestId',
                searchBlob: 'defaultSearchBlob'
            };
            stubAmazonItemFilter.resolves(defaultSuccessData);

            return itemFilter(fakeRequest, fakeResponse, spyNext).then(() => {
                expect(stubAmazonItemLookup).to.have.been.calledWithExactly(
                    [givenAsin1, givenAsin2],
                    'Medium',
                    expectedLocaleData.amazonLocale
                );
            });
        });

        describe('when itemLookup call succeeds', () => {
            const defaultSuccessResponse = {
                ItemLookupResponse: {
                    $: {
                        xmlns:
                            'http://webservices.amazon.com/AWSECommerceService/2013-08-01'
                    },
                    OperationRequest: {
                        RequestId: 'fb975a52-a895-4b97-a300-bfbda0454e33',
                        Arguments: [Object],
                        RequestProcessingTime: '0.0011075730000000'
                    }
                }
            };

            beforeEach(() => {
                stubAmazonItemLookup.resolves(defaultSuccessResponse);
            });

            it('should call apiSuccess with expected parameters', () =>
                itemFilter(fakeRequest, fakeResponse, spyNext).then(() => {
                    expect(
                        stubApiSuccessResponse
                    ).to.have.been.calledWithExactly(
                        defaultSuccessResponse,
                        'ItemLookup',
                        fakeResponse,
                        spyNext
                    );
                }));
        });
    });

    describe('when itemFilter call fails with no data', () => {
        const defaultFailureData = {
            asins: []
        };

        beforeEach(() => {
            stubAmazonItemFilter.resolves(defaultFailureData);
        });

        it('should not call itemLookup', () =>
            itemFilter(fakeRequest, fakeResponse, spyNext).then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(stubAmazonItemLookup).to.not.have.been.called;
            }));

        it('should respond with expected JSON response when on page 0', () => {
            const expectedMessage = textMessage(
                "Santa can't find that gift at the moment."
            );
            return itemFilter(fakeRequest, fakeResponse, spyNext).then(() => {
                expect(stubResponseJson).to.be.calledWithExactly(
                    expectedMessage
                );
            });
        });

        it('should respond with expected JSON response when page is greater than 0', () => {
            fakeRequest.query.page = 1;
            const expectedMessage = textMessage(
                "Santa can't find any more of that type of gift in his grotto."
            );
            return itemFilter(fakeRequest, fakeResponse, spyNext).then(() => {
                expect(stubResponseJson).to.be.calledWithExactly(
                    expectedMessage
                );
            });
        });
    });
});
