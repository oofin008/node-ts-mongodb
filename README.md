# Note
###### Author: Santi Liwsakphaiboon

### Get start
```sh
  npm i
  docker compose up -d
  npm run dev
```

### Explain
#### For Data Seeding
I implement it as `[POST] localhost:3001/seed`
So, before calling any API, call `/seed` first.

#### Available API
Base path: localhost:3001
| Method | Path |
| ---------- | ---------- |
| GET | /ping |
| POST | /seed |
| GET | /prices |
| GET | /averagePrices |


# Overview

Your challenge, should you choose to accept it, is to:

-   Start a local MongoDB server. If you have Docker installed, you can do this with something like `docker run -p 27017:27017 mongo:4.4.13`

-   Enhance this starter application so that upon startup it loads the data from [./src/quotes.ts](./src/quotes.ts) into a MongoDB collection named 'prices'.

-   Using [Express](http://expressjs.com/), create a 'prices' GET REST API to retrieve the contents of the collection using the [MongoDB query API](https://docs.mongodb.com/manual/tutorial/query-documents/), returning the results to the caller as an array of JSON documents. It should be possible to call the API from a browser. 12 documents should be returned.

-   Create a second 'averagePrices' GET REST API which uses the [MongoDB Aggregation API](https://docs.mongodb.com/manual/aggregation/) to group documents by their 'symbol' and calculate the average price, returning the results to the caller as an array of JSON documents, each containing the symbol and the average price. 4 documents should be returned from each call to the API.

-   Enhance the second REST API so that as well as returning each symbol with its average price, the current price is also returned. The current price should not be retrieved from the database, but instead a REST call should be made to the Yahoo Finance stock quote service to get the latest price.

    Documentation for the service can be found [here](https://syncwith.com/yahoo-finance/yahoo-finance-api).

    Various Yahoo Finance APIs are available but https://query1.finance.yahoo.com/v7/finance/quote?symbols={symbol} is a good fit.

    You should extract the `regularMarketPrice` field from the response and return it along with the aggregated data returned from MongoDB. The response should continue to return 4 documents.

    This external URL can be hardcoded and your code does not have to include any error handling.

To complete this challenge you can and should:

-   Use the internet to help answer any questions that you do not yourself know the answer to.

-   Use NPM or Yarn to add [Axios](https://www.npmjs.com/package/axios) to this project (For making REST calls). If you prefer to use a different REST client you are free to do so.

-   Feel free to refactor or re-organise the code in any way you choose.

-   Manually test your code.

It is not expected that you will write any automated tests.

If you have not used TypeScript before, it is a superset of JavaScript so you should be able to write JavaScript code without any problems. If you prefer to write in JavaScript this is not a problem but you will need to amend some of the scripts in package.json to run from the src directory instead of the lib directory.

## Notes about this starter project:

You will need to run NPM or Yarn to install dependencies and compile the TypeScript code. For example:

```
npm run compile
```

or

```
yarn compile
```

If you wish, you can use the 'Tasks->Run Build Task' in VS Code to watch the TypeScript for changes and build on demand, or do this manually using:

```
npm run watch
yarn watch
```

The application can be started in development mode by running:

```
npm run dev
```

or

```
yarn dev
```

Once running, the application should restart when changes to the **JavaScript** are detected.
