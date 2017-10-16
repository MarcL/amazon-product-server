import * as api from '../services/amazon';
import {gallery} from '../transformers/chatfuel';
import {parseItem} from '../parsers/amazon';
import {notFound} from '../botResponses';
import logger from '../logger';

const christmasItems = [
    {name: 'Christmas Films', browseNode: '14153804031'},
    {name: 'Cold Weather Clothes', browseNode: '14185601031'},
    {name: 'Christmas decorations', browseNode: '3274003031'},
    {name: 'Advent Calendars', browseNode: '14160906031'},
    {name: 'Food and Drink', browseNode: '14167174031'},
    {name: 'Jewellery and Watches', browseNode: '14187278031'},
    {name: 'Tableware and Crackers', browseNode: '7145523031'},
    {name: 'Christmas Cooking', browseNode: '3274045031'}
];

const randomElement = array => array[Math.floor(Math.random() * array.length)];

function getPresentList(request, response) {
    const {id} = request.params;

    api
        .browseNodeLookup(christmasItems[id].browseNode)
        .then(amazonResponse => {
            // TODO : Validate this
            const topItemList =
                amazonResponse.BrowseNodeLookupResponse.BrowseNodes.BrowseNode
                    .TopItemSet.TopItem;

            return topItemList.map(item => {
                return item.ASIN;
            });
        })
        .then(asinList => api.itemLookup(asinList))
        .then(lookupResponse => {
            const itemList = lookupResponse.ItemLookupResponse.Items.Item;
            return itemList.map(item => parseItem(item));
        })
        .then(simpleAmazonItemList => {
            response.json(gallery(simpleAmazonItemList));
        })
        .catch(error => {
            logger.error('Error bot API', error);
            response.json(notFound);
        });
}

export {getPresentList};
