const FALLBACK_LOCALE = 'us';

const getLocaleData = (locale = 'us') => {
    const validCountries = {
        uk: {domain: 'co.uk', amazonLocale: 'UK'},
        us: {domain: 'com', amazonLocale: 'US'},
        fr: {domain: 'fr', amazonLocale: 'FR'},
        de: {domain: 'de', amazonLocale: 'DE'}
    };

    const lowercaseCountryCode = locale.toLowerCase();
    return validCountries[lowercaseCountryCode]
        ? validCountries[lowercaseCountryCode]
        : validCountries[FALLBACK_LOCALE];
};

export default getLocaleData;
