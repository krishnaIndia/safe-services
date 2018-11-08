# Safe Network email subscription

### Getting started

#### Add cred.ts file

Add `cred.ts` with the content
```
export default {
	mailChimpApiKey: 'api-key'
};

```


In order to start the project, you will need Node 8 installed! Please visit nodejs.org and fetch the latest version.

Install all required dependecies with

```
yarn install
```

or

```
npm install
```





Create a .env file in the project root where you will keep the environment variables. Using the environment variables is based on the dotenv package, whose details can be found here: https://github.com/motdotla/dotenv

Example `.env`

```
NODE_ENV=development
PORT=3001
```



To start a development node server, simply type

```javascript
yarn nstart
```

or

```javascript
npm run nstart
```

If you would like to build, use one of the following commands respectively

```
yarn build
```

or

```
npm run build
```



To keep everything simple, a simple `npm start` script will have everything prepared for production. No additional configuration needed.
