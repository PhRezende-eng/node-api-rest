import { MongoClient } from 'mongodb';


class OrdersModule {
    static async readAllOrders(client: MongoClient) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrders = await getCollection.find({}).toArray();

        if (getOrders != null) {
            return getOrders;
        } else {
            throw 'Is not possible query all orders!';
        }
    }

    static async readOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder = await getCollection.findOne({ _id: idFromParams });

        if (getOrder != null) {
            return getOrder;
        } else {
            throw 'Is not possible query the order!';
        }
    }

    static async updateOneOrder(client: MongoClient, idFromParams: String, order: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const updateOrder = await getCollection.updateOne({ _id: idFromParams }, { $set: order });

        if (updateOrder.matchedCount > 0) {
            const getOrderToResponse = await getCollection.findOne({ _id: idFromParams });
            return getOrderToResponse;
        } else {
            throw 'Is not possible query the order!';
        }
    }

    static async createOneOrder(client: MongoClient, order: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');

        const createOrder = await getCollection.insertOne(order);

        if (createOrder.insertedId != null) {
            const getNewOrder = await getCollection.findOne({ _id: order['_id'] });
            return getNewOrder;
        } else {
            throw 'Is not possible query the new order!';
        }
    }

    static async deleteOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder = await getCollection.findOne({ _id: idFromParams });

        if (getOrder != null) {
            await getCollection.findOneAndDelete({ _id: idFromParams });
            return getOrder;
        } else {
            throw 'Is not possible query the order to delete!';
        }
    }
}


export default OrdersModule;
