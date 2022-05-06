import { ObjectID } from 'bson';
import { MongoClient } from 'mongodb';


class OrdersModule {
    static async readAllOrders(client: MongoClient) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrders = await getCollection.find({}).toArray();

        if (getOrders != null) {
            return getOrders;
        } else {
            console.log('Is not possible get all orders!');
            throw 'Is not possible query all orders!';
        }
    }

    static async readOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder = await getCollection.findOne({ id: idFromParams });

        if (getOrder != null) {
            return getOrder;
        } else {
            throw 'Is not possible query the order!';
        }
    }

    static async updateOneOrder(client: MongoClient, idFromParams: String, order: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const updateOrder = await getCollection.updateOne({ id: idFromParams }, { $set: order });

        if (updateOrder.matchedCount > 0) {
            const getOrderToResponse = await getCollection.findOne({ id: idFromParams });
            return getOrderToResponse;
        } else {
            throw 'Is not possible query the order!';
        }
    }

    static async createOneOrder(client: MongoClient, order: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');

        const id = new ObjectID().toString();
        order['_id'] = id;

        const createOrder = await getCollection.insertOne(order);

        if (createOrder != null) {
            const getNewOrder = await getCollection.findOne({ id: order['id'] });
            return getNewOrder;
        } else {
            throw 'Is not possible query the new order!';
        }
    }

    static async deleteOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder = await getCollection.findOne({ id: idFromParams });

        if (getOrder != null) {
            await getCollection.deleteOne({ id: idFromParams });
            return getOrder;
        } else {
            throw 'Is not possible query the new order!';
        }
    }
}


export default OrdersModule;
