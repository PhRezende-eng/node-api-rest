import { MongoClient } from 'mongodb';


class OrdersPromises {
    static async readAllOrders(client: MongoClient) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrders = await getCollection.find({}).toArray();
        return getOrders;
    }

    static async readOneOrder(client: MongoClient, idFromParams: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder = await getCollection.findOne({ id: idFromParams });
        return getOrder;
    }
}

export default OrdersPromises;
