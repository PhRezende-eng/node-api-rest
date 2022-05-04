import { MongoClient } from 'mongodb';


class OrdersPromises {
    static async readAllOrders(client: MongoClient) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrders = await getCollection.find({}).toArray();
        return getOrders;
    }
}

export default OrdersPromises;
