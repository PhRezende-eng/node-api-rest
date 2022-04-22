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
        // await findOndeDocumentOnCollection(client, 'sample_mflix', 'movies', 'Back to the Future');
        // await createListing(client, 'sample_airbnb', 'listingsAndReviews', {
        //     _id: 1,
        //     name: 'Paulo henrique',
        //     age: 21,
        //     male: true,
        // });


    } catch (e) {
        console.error(`Catch Error ${e}`);

    } finally {
        console.log('Close connection');
        await client.close();

    }


}

async function createListing(client: MongoClient, dataBase: String, collection: String, object: Object) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const response = await getCollection.insertOne(object);
    console.log(response);
}

async function findOndeDocumentOnCollection(cliente: MongoClient, dataBase: String, collection: String, title: any) {
    const result = cliente.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const query = { title: title };
    const movie = await getCollection.findOne(query);
    console.log(movie);
}

async function listDatabase(client: MongoClient) {
    const databasesList = await client.db().admin().listDatabases();

    console.log('Database: ');
    databasesList.databases.forEach(db => console.log(`- ${db.name}`))
}

export default connection;