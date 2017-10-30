// TODO : Think that search indices are localised
// Might need to pass through the expected Amazon locale
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

const validateSearchIndex = index => {
    if (!index) {
        return 'All';
    }
    const validIndex = validSearchIndexNames.filter(
        indexName => indexName.toLowerCase() === index.toLowerCase()
    );

    return validIndex.length ? validIndex[0] : 'All';
};

export default validateSearchIndex;
