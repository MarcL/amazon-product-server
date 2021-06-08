import getLocaleData from '../../src/validLocales';

describe('validLocales', () => {
    it('should return expected locale data if no locale is passed', () => {
        const localeData = getLocaleData();

        expect(localeData).to.deep.equal({
            amazonLocale: 'US',
            domain: 'com'
        });
    });

    it('should return expected locale data if uk passed', () => {
        const localeData = getLocaleData('uk');

        expect(localeData).to.deep.equal({
            amazonLocale: 'UK',
            domain: 'co.uk'
        });
    });

    it('should return expected locale data if us passed', () => {
        const localeData = getLocaleData('us');

        expect(localeData).to.deep.equal({
            amazonLocale: 'US',
            domain: 'com'
        });
    });

    it('should return expected locale data if fr passed', () => {
        const localeData = getLocaleData('fr');

        expect(localeData).to.deep.equal({
            amazonLocale: 'FR',
            domain: 'fr'
        });
    });

    it('should return expected locale data if de passed', () => {
        const localeData = getLocaleData('de');

        expect(localeData).to.deep.equal({
            amazonLocale: 'DE',
            domain: 'de'
        });
    });

    it('should return expected locale data if locale is uppercase', () => {
        const localeData = getLocaleData('UK');

        expect(localeData).to.deep.equal({
            amazonLocale: 'UK',
            domain: 'co.uk'
        });
    });
});
