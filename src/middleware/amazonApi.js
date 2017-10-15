import {browseNodeLookup, itemLookup, itemSearch} from '../services/amazon';
import {gallery} from '../transformers/chatfuel';

const christmasItems = [
    {name: 'Christmas Films', browseNode: '14153804031'},
    {name: 'Advent Calendars', browseNode: '14160906031'},
    {name: 'Food and Drink', browseNode: '14167174031'},
    {name: 'Jewellery and Watches', browseNode: '14187278031'},
    {name: 'Tableware and Crackers', browseNode: '7145523031'},
    {name: 'Christmas Cooking', browseNode: '3274045031'}
];

const randomElement = array => array[Math.floor(Math.random() * array.length)];

function amazonApi(request, response) {
    const {ageGroup} = request.params;

    browseNodeLookup(christmasItems[0].browseNode)
        .then(amazonResponse => {
            // TODO : Validate this
            const topItemList =
                amazonResponse.BrowseNodeLookupResponse.BrowseNodes.BrowseNode
                    .TopItemSet.TopItem;

            return topItemList.map(item => {
                return item.ASIN;
            });
        })
        .then(asinList => itemLookup(asinList))
        .then(simpleAmazonItemList => {
            const chatfuelGallery = gallery(simpleAmazonItemList);
            response.json(chatfuelGallery);
        })
        .catch(error => {
            console.error(error);
        });
}

export default amazonApi;
