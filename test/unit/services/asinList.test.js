import asinArrayToCommaSeparatedList from '../../../src/services/asinList';

describe('asinList', () => {
    it('should throw expected error if no asin numbers passed', () => {
        const wrapper = () => asinArrayToCommaSeparatedList();

        expect(wrapper).to.throw('Missing asin number(s)');
    });

    it('should throw expected error if more than 10 asin numbers are passed', () => {
        const asinString =
            'asin,asin,asin,asin,asin,asin,asin,asin,asin,asin,asin';
        const givenAsinList = asinString.split(',');
        const wrapper = () => asinArrayToCommaSeparatedList(givenAsinList);

        expect(wrapper).to.throw('Exceeded maximum permitted Amazon ASINs');
    });

    it('should return expected data if single asin is passed', () => {
        const givenAsin = 'givenAsin';
        const returned = asinArrayToCommaSeparatedList(givenAsin);

        expect(returned).to.equal(givenAsin);
    });

    it('should return expected data if a valid asin array is passed', () => {
        const givenAsinList = ['asin1', 'asin2', 'asin3'];
        const returned = asinArrayToCommaSeparatedList(givenAsinList);

        expect(returned).to.equal(givenAsinList.join(','));
    });
});
