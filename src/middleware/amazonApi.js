import * as api from '../services/amazon';
import {chatfuelGallery} from '../transformers/chatfuel';

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

function amazonApi(request, response) {
    const {id} = request.params;

    api
        .browseNodeLookup(christmasItems[id].browseNode)
        .then(amazonResponse => {
            response.json(amazonResponse);
            // // TODO : Validate this
            // const topItemList =
            //     amazonResponse.BrowseNodeLookupResponse.BrowseNodes.BrowseNode
            //         .TopItemSet.TopItem;

            // return topItemList.map(item => {
            //     return item.ASIN;
            // });
        })
        // .then(asinList => api.itemLookup(asinList))
        // .then(simpleAmazonItemList => {
        //     const gallery = chatfuelGallery(simpleAmazonItemList);
        //     response.json(gallery);
        // })
        .catch(error => {
            console.error(error);
        });
}

const itemSearch = (request, response) => {
    const {keywords} = request.params;

    api
        .itemSearch(keywords)
        .then(amazonResponse => response.json(amazonResponse))
        .catch(error => console.error(error.message));
};

const browseNodeLookup = (request, response) => {
    const {id} = request.params;

    api
        .browseNodeLookup(id)
        .then(amazonResponse => response.json(amazonResponse))
        .catch(error => console.error(error.message));
};

const itemLookup = (request, response) => {
    const {asin} = request.params;

    api
        .itemLookup(asin)
        .then(amazonResponse => response.json(amazonResponse))
        .catch(error => console.error(error.message));
};

export {amazonApi, browseNodeLookup, itemLookup, itemSearch};
