import { MongoClient } from 'mongodb';

async function connection() {
    const uri = '';

    const client = new MongoClient(uri);

    console.log('Conectando com o dataBase...');

    await client.connect();

    try {
        await client.connect();
        await listDatabase(client);

    } catch (e) {
        console.error(e);

    } finally {
        console.log('Close connection');
        await client.close();

    }


}


async function listDatabase(client: MongoClient) {
    const databasesList = await client.db().admin().listDatabases();

    console.log('Database: ');
    databasesList.databases.forEach(db => console.log(`- ${db.name}`))
}

export default connection;