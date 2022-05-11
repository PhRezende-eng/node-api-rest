import { ObjectID } from 'bson';
import { MongoClient } from 'mongodb';



class OrdersModule {
    static async readAllOrders(client: MongoClient) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrders: Array<any> = await getCollection.find({}).toArray();

        if (getOrders != null) {
            const orders: Array<any> = [];

            for (let order of getOrders) {
                order['id'] = order['_id'];
                delete order['_id'];
                orders.push(order);
            }

            return orders;
        } else {
            throw 'Is not possible query all orders!';
        }
    }

    static async readOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder: any = await getCollection.findOne({ _id: new ObjectID(`${idFromParams}`) });

        if (getOrder != null) {
            getOrder['id'] = getOrder['_id'];
            delete getOrder['_id'];
            return getOrder;
        } else {
            throw 'Is not possible query the order!';
        }
    }

    static async updateOneOrder(client: MongoClient, idFromParams: String, order: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const updateOrder = await getCollection.updateOne({ _id: new ObjectID(`${idFromParams}`) }, { $set: order });

        if (updateOrder.matchedCount > 0) {
            const getOrderToResponse: any = await getCollection.findOne({ _id: new ObjectID(`${idFromParams}`) });
            getOrderToResponse['id'] = getOrderToResponse['_id'];
            delete getOrderToResponse['_id'];
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
            const getNewOrder: any = await getCollection.findOne({ _id: order['_id'] });
            getNewOrder['id'] = getNewOrder['_id'];
            delete getNewOrder['_id'];
            return getNewOrder;
        } else {
            throw 'Is not possible query the new order!';
        }
    }

    static async deleteOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const getOrder: any = await getCollection.findOne({ _id: new ObjectID(`${idFromParams}`) });

        if (getOrder != null) {
            await getCollection.findOneAndDelete({ _id: new ObjectID(`${idFromParams}`) });
            getOrder['id'] = getOrder['_id'];
            delete getOrder['_id'];
            return getOrder;
        } else {
            throw 'Is not possible query the order to delete!';
        }
    }
}


export default OrdersModule;
