import itemSearch from '../services/amazon';

function amazonApi(request, response) {
    itemSearch()
        .then(amazonResponse => {
            response.json({items: amazonResponse.ItemSearchResponse.Items});
        })
        .catch(error => {
            console.error(error);
        });
}

export default amazonApi;
