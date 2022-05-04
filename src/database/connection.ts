import { MongoClient } from 'mongodb';

import 'dotenv/config'

const notFound = 'Object not found!\n';

async function connection() {
    const uri = `${process.env.CONNECTION_TO_DATABASE}`;

    const client = new MongoClient(uri);

    console.log('Conectando com o dataBase...');


    try {
        await client.connect();
        return client;
    } catch (e) {
        console.error(`Catch Error ${e}`);
        throw `Catch Error ${e}`;
    }
}


async function createDocument(client: MongoClient, dataBase: String, collection: String, object: Object) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const insertResponse = await getCollection.insertOne(object);
    if (insertResponse != null) {
        const findResponse = await getCollection.findOne({ _id: insertResponse.insertedId });
        console.log(findResponse);
        console.log('Created!\n');
    } else {
        console.log(notFound);
    }
}

async function readDocument(client: MongoClient, dataBase: String, collection: String, query: Object) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const findResponse = await getCollection.findOne(query);
    if (findResponse != null) {
        console.log(findResponse);
        console.log('Readed!\n');
    } else {
        console.log(notFound);
    }
}

async function updateDocument(client: MongoClient, dataBase: String, collection: String, query: Object) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const updateResponse = await getCollection.updateOne(query, { $set: { _id: '6263799946d2e6014e5dd9fd' } });
    if (updateResponse != null) {
        const findResponse = await getCollection.findOne(query);
        console.log(findResponse);
        console.log('Updated!\n');
    } else {
        console.log(notFound);
    }
}

async function deleteDocument(client: MongoClient, dataBase: String, collection: String, query: Object) {
    const result = client.db(`${dataBase}`);
    const getCollection = result.collection(`${collection}`);
    const findResponse = await getCollection.findOne(query);
    if (findResponse != null) {
        await getCollection.deleteOne(query);
        console.log(findResponse);
        console.log('Deleted!\n');
    } else {
        console.log(notFound);
    }
}

export default connection;

// async function insertMultiplesDocuments(client: MongoClient, dataBase: String, collection: String, multiplesDocuments: Array<Object>) {
//     const result = client.db(`${dataBase}`);
//     const getCollection = result.collection(`${collection}`);
//     const response = await getCollection.insertMany(multiplesDocuments);
//     console.log(response.insertedIds);
// }

// async function findOneDocument(cliente: MongoClient, dataBase: String, collection: String, query: Object) {
//     const result = cliente.db(`${dataBase}`);
//     const getCollection = result.collection(`${collection}`);
//     const response = await getCollection.findOne(query);
//     console.log(response);
// }

// async function listDatabase(client: MongoClient) {
//     const databasesList = client.db();
//     const accessAdmin = databasesList.admin();
//     const response = await accessAdmin.listDatabases();
//     response.databases.forEach(db => console.log(`- ${db.name}`))
// }

// await createDocument(client, 'sample_airbnb', 'listingsAndReviews',
// await readDocument(client, 'sample_mflix', 'movies', { title: 'Blacksmith Scene' });
// await updateDocument(client, 'ShopProject', 'orders', { date: '1643770663986' });
// await deleteDocument(client, 'sample_mflix', 'movies', { title: 'The Great Train Robbery' });

// const result = await getAllOrders(client, idQuery);

// return result;

// await listDatabase(client);

// await findOneDocument(client, 'sample_mflix', 'movies', { title: 'Blacksmith Scene' });
// {
//     _id: 1,
//         name: 'Paulo henrique',
//             age: 21,
//                 male: true,
//         });

// await insertMultiplesDocuments(client, 'sample_airbnb', 'listingsAndReviews',
//     [
//         {
//             _id: 1,
//             nome: "Paulo henrique"
//         },
//         {
//             _id: 2,
//             nome: "João Paulo"
//         }
//     ]);