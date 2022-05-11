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
            throw 'Orders not found, is not possible read all orders!';
        }
    }

    static async readOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');

        if (!ObjectID.isValid(`${idFromParams}`)) {
            throw 'Invalid ID!';
        }

        const query = { _id: new ObjectID(`${idFromParams}`) };
        const getOrder: any = await getCollection.findOne(query);

        if (getOrder != null) {
            getOrder['id'] = getOrder['_id'];
            delete getOrder['_id'];
            return getOrder;
        } else {
            throw 'Order not found, is not possible read the order!';
        }
    }

    static async updateOneOrder(client: MongoClient, idFromParams: String, body: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');

        if (!ObjectID.isValid(`${idFromParams}`)) {
            throw 'Invalid ID!';
        }

        const query = { _id: new ObjectID(`${idFromParams}`) };
        const updateOrder = await getCollection.updateOne(query, { $set: body });

        if (updateOrder.matchedCount > 0) {
            const getOrderToResponse: any = await getCollection.findOne(query);
            getOrderToResponse['id'] = getOrderToResponse['_id'];
            delete getOrderToResponse['_id'];
            return getOrderToResponse;
        } else {
            throw 'Order not found, is not possible update the order!';
        }
    }

    static async createOneOrder(client: MongoClient, body: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');
        const createOrder = await getCollection.insertOne(body);

        if (createOrder.insertedId != null) {
            const query = { _id: body['_id'] };
            const getNewOrder: any = await getCollection.findOne(query);

            getNewOrder['id'] = getNewOrder['_id'];
            delete getNewOrder['_id'];
            return getNewOrder;
        } else {
            throw 'Order not inserted, is not possible post the order!';
        }
    }

    static async deleteOneOrder(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('orders');

        if (!ObjectID.isValid(`${idFromParams}`)) {
            throw 'Invalid ID!';
        }

        const query = { _id: new ObjectID(`${idFromParams}`) };
        const getOrder: any = await getCollection.findOne(query);

        if (getOrder != null) {
            await getCollection.findOneAndDelete(query);

            getOrder['id'] = getOrder['_id'];
            delete getOrder['_id'];
            return getOrder;
        } else {
            throw 'Oder not found, is not possible delete the order!';
        }
    }
}


export default OrdersModule;
