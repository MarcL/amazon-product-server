# amazon-product-server

> Set up your own Amazon Product API server

## Installation

Clone the project and install the dependencies

```shell
git clone git@github.com:MarcL/amazon-product-server.git

```

Install the dependencies with npm or yarn:

```shell
cd amazon-product-server
yarn install
```

## Amazon Product API Credentials

Before getting started you'll need to set up an Amazon Associate account. This will give you an Amazon key and secret. You'll also need to set up your affiliate codes for the UK and US territories. See [Amazon Product API Set Up](http://docs.amazonwebservices.com/AWSECommerceService/2011-08-01/GSG/GettingSetUp.html) for more details.

Ensure that you keep the key and secret credentials safe. Don't check them into GitHub!

## Running

Run the server locally in development mode using npm or yarn:

```shell
yarn watch
```

### Environment Variables

Create a `.env` file to use for local development which contains the following environment variables:

```shell
AMAZON_KEY_ID=<amazon-key-id>
AMAZON_SECRET_KEY=<amazon-secret-key>
AMAZON_ASSOCIATE_ID_UK=<amazon-uk-affiliate-id>
AMAZON_ASSOCIATE_ID_US=<amazon-uk-affiliate-id>
API_KEY=<your-own-api-key>
```

Note that this file ahould never be checked into your repository. The `.gitignore` will ignore it but be aware that you don't accidentally allow it to be added.

If you're planning on deploying publically then you'll need to define these environment variables before starting the server.

### Deploy using Now

You can use ZeitHQ's [now](https://zeit.co/now) to easily deploy your own version of this API server. Update the configuration file `now.json` to change the `alias` property if you plan to use it.

Set up the `now` client secrets using the `now secrets` command. You'll need to set up the following variables as per the `.env` file above with the expected keys:

```shell
amazon-key-id
amazon-secret-key
amazon-associate-id-uk
amazon-associate-id-us
amazon-product-server-api-key
```

Deployment of the application is then as simple as
```shell
now
```

## "Security"

By default the microservice is minimally secured by using a user defined API key. I may look at a more secure service in the future but it works for now.

## Endpoints

### ItemSearch

```shell
/itemsearch
```

### SimilarityLookup

```shell
/similaritylookup
```

## Response Formats

### JSON

### Chatfuel / Facebook Messenger

## License

[LICENSE](LICENSE)