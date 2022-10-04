// In case you need the implementation of the FetchAPI
// yarn add -D whatwg-fetch
// import 'whatwg-fetch'; 

// In case you find packages that require it
// yarn add -D setimmediate
// import 'setimmediate';

// In case you have environment variables and still don't support the import.meta.env
// yarn add -D dotenv
require('dotenv').config({
    path: '.env.test'
});

// Mock full environment variables
jest.mock('./src/helpers/getEnvVariables', () => ({
    getEnvVariables: () => ({ ...process.env })
}));