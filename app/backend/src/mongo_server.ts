import { MongoDbClient } from '../dist/entities/MongoDbClient.js';
export const mongoInstance = MongoDbClient.getMongoDbInstance();
// import { MongoClient, ServerApiVersion } from 'mongodb';
// import * as dotenv from 'dotenv';

// dotenv.config();
// const MONGO_DB_USER = process.env.MONGO_DB_USER ? process.env.MONGO_DB_USER : 'MONGO_USER_NOT_FOUND';
// const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD ? process.env.MONGO_DB_PASSWORD : 'MONGO_PASSWORD_NOT_FOUND';
// const MONGO_DB_HOST = process.env.MONGO_DB_HOST ? process.env.MONGO_DB_HOST : 'MONGO_HOST_NOT_FOUND';
// const MONGO_DB_APP_NAME = process.env.MONGO_DB_APP_NAME ? process.env.MONGO_DB_APP_NAME : 'MONGO_APP_NAME_NOT_FOUND';

// const uri = `mongodb+srv://${MONGO_DB_USER}:${encodeURIComponent(
//   MONGO_DB_PASSWORD,
// )}@${MONGO_DB_HOST}/?retryWrites=true&w=majority&appName=${MONGO_DB_APP_NAME}`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function pingMongoDb() {
//   console.log('Attempting to connect to MongoDb. . . .');
//   try {
//     console.log('Connecting to client. . . .');
//     await client.connect();
//     console.log('Pinging MongoDb. . . .');
//     await client.db('admin').command({ ping: 1 });
//     console.log('Pinged your deployment. You successfully connected to MongoDB!');
//   } catch (err) {
//     console.log(err);
//   } finally {
//     console.log('Closing connection. . . .');
//     await client.close();
//     console.log('Connection closed.');
//   }
// }
