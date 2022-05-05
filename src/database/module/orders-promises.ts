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
            throw 'Is not possible get all orders!';
        }
    }

    static async readOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder = await getCollection.findOne({ id: idFromParams });
        if (getOrder != null) {
            return getOrder;
        } else {
            console.log('Is not possible get the order!');
            throw 'Is not possible get the order!';
        }
    }

    static async updateOneOrder(client: MongoClient, idFromParams: any, order: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        console.log(order)
        const updateOrder = await getCollection.updateOne({ date: idFromParams }, { $set: order });
        if (updateOrder.upsertedId != null) {
            const getOrderToResponse = await getCollection.findOne({ date: idFromParams });
            return getOrderToResponse;
        } else {
            return "Is not possible update, order not found!";
        }
    }
}

export default OrdersModule;
