import validateSearchIndex from '../../../src/validators/amazonSearchIndex';

const validSearchIndexNames = [
    'All',
    'Apparel',
    'Appliances',
    'Automotive',
    'Baby',
    'Beauty',
    'Blended',
    'Books',
    'Classical',
    'DVD',
    'Electronics',
    'Grocery',
    'HealthPersonalCare',
    'HomeGarden',
    'HomeImprovement',
    'Jewelry',
    'KindleStore',
    'Kitchen',
    'Lighting',
    'Marketplace',
    'MP3Downloads',
    'Music',
    'MusicTracks',
    'MusicalInstruments',
    'OfficeProducts',
    'OutdoorLiving',
    'Outlet',
    'PetSupplies',
    'PCHardware',
    'Shoes',
    'Software',
    'SoftwareVideoGames',
    'SportingGoods',
    'Tools',
    'Toys',
    'VHS',
    'Video',
    'VideoGames',
    'Watches'
];

const validLowercaseSearchIndexNames = validSearchIndexNames.map(name =>
    name.toLowerCase()
);

describe('amazonSearchIndex', () => {
    it("should return 'All' if no index is passed", () => {
        const searchIndex = validateSearchIndex();

        expect(searchIndex).to.equal('All');
    });

    validSearchIndexNames.forEach(name => {
        it(`should return '${name}' if '${name}' is passed`, () => {
            const searchIndex = validateSearchIndex(name);

            expect(searchIndex).to.equal(name);
        });
    });

    validLowercaseSearchIndexNames.forEach((name, index) => {
        const expectedCapitalisedName = validSearchIndexNames[index];
        it(`should return '${expectedCapitalisedName}' if '${name}' is passed`, () => {
            const searchIndex = validateSearchIndex(name);

            expect(searchIndex).to.equal(expectedCapitalisedName);
        });
    });

    it("should return 'All' if invalid index is passed", () => {
        const searchIndex = validateSearchIndex('Invalid');

        expect(searchIndex).to.equal('All');
    });
});
