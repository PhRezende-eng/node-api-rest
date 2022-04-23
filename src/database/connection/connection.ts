import { MongoClient } from 'mongodb';

import 'dotenv/config'

async function connection() {
    const uri = `${process.env.CONNECTION_TO_DATABASE}`;

    const client = new MongoClient(uri);

    console.log('Conectando com o dataBase...');

    await client.connect();

    try {
        await client.connect();
        // await listDatabase(client);
        // await findOneDocument(client, 'sample_mflix', 'movies',{ title: 'Back to the Future' });
        await readDocument(client, 'sample_mflix', 'movies', { title: 'Back to the Future' });
        // await insertDocument(client, 'sample_airbnb', 'listingsAndReviews',
        // {
        //     _id: 1,
        //     name: 'Paulo henrique',
        //     age: 21,
        //     male: true,  
        // });
        // await insertMultiplesDocuments(client, 'sample_airbnb', 'listingsAndReviews',
        //[
        //    {
        //        _id: 1,
        //        nome: "Paulo henrique"
        //    },
        //    {
        //        _id: 2,
        //        nome: "João Paulo"
        //    }
        //]);
    } catch (e) {
        console.error(`Catch Error ${e}`);
    } finally {
        console.log('Close connection');
        await client.close();
    }
}

async function readDocument(client: MongoClient, dataBase: String, collection: String, query: Object) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const response = await getCollection.findOne(query);
    console.log(response ? response : `Not found document`);
}

async function insertMultiplesDocuments(client: MongoClient, dataBase: String, collection: String, multiplesDocuments: Array<Object>) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const response = await getCollection.insertMany(multiplesDocuments);
    console.log(response.insertedIds);
}

async function insertDocument(client: MongoClient, dataBase: String, collection: String, object: Object) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const response = await getCollection.insertOne(object);
    console.log(response.insertedId);
}

async function findOneDocument(cliente: MongoClient, dataBase: String, collection: String, query: Object) {
    const result = cliente.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const response = await getCollection.findOne(query);
    console.log(response);
}

async function listDatabase(client: MongoClient) {
    const databasesList = client.db();
    const accessAdmin = databasesList.admin();
    const response = await accessAdmin.listDatabases();
    response.databases.forEach(db => console.log(`- ${db.name}`))
}

export default connection;