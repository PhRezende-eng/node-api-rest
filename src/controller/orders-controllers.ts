import connection from '../database/connection';
import OrdersModule from '../database/module/orders-module';
import { ObjectID } from 'bson';

class OrdersController {
    static async getAllOrders(req: any, res: any) {
        const responseDB = await connection();

        try {
            const listOrderMap = await OrdersModule.readAllOrders(responseDB);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                count: listOrderMap.length,
                data: listOrderMap,
            })
        } catch (errorResponse) {

            res.status(404).json({
                statusMessage: 'notFound',
                statusCode: 404,
                data: errorResponse,
            });
        } finally {
            console.log('Close connection');
            await responseDB.close();
        }
    };

    static async getOneOrder(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;

        try {
            const orderMap = await OrdersModule.readOneOrder(responseDB, id);
            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: orderMap,
            });
        } catch (errorResponse) {
            res.status(404).json({
                statusMessage: 'notFound',
                statusCode: 404,
                data: errorResponse,
            });
        } finally {
            console.log('Close connection');
            await responseDB.close();
        }
    };

    static async updateOrder(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;
        const body = req.body;

        try {
            const orderMapUpdate = await OrdersModule.updateOneOrder(responseDB, id, body);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: orderMapUpdate,
            });

        } catch (errorResponse) {

            res.status(404).json({
                statusMessage: 'notFound',
                statusCode: 404,
                data: errorResponse,
            });

        } finally {
            console.log('Close connection');
            await responseDB.close();
        }
    }

    static async createOrder(req: any, res: any) {
        const responseDB = await connection();

        const id = new ObjectID().toString();
        const order = req.body;

        order['_id'] = id;

        try {
            const createOrderResponse = await OrdersModule.createOneOrder(responseDB, order);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: createOrderResponse,
            });
        } catch (errorResponse) {
            res.status(404).json({
                statusMessage: 'notFound',
                statusCode: 404,
                data: errorResponse,
            });
        } finally {
            console.log('Close connection');
            await responseDB.close();
        }
    }

    static async deleteOrder(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;

        try {
            const deleteOrderResponse = await OrdersModule.deleteOneOrder(responseDB, id);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: deleteOrderResponse,
            });
        } catch (errorResponse) {

            res.status(404).json({
                statusMessage: 'notFound',
                statusCode: 404,
                data: errorResponse,
            });
        } finally {

            console.log('Close connection');
            await responseDB.close();
        }
    }
}

export default OrdersController;