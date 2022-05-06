import connection from '../database/connection';

import OrdersModule from '../database/module/orders-promises';

class OrdersFromDB {
    static async getAllOrders(req: any, res: any) {
        const responseDB = await connection();

        try {
            const listOrderMap = await OrdersModule.readAllOrders(responseDB);

            res.status(200).json({
                statusMessage: 'success',
                count: listOrderMap.length,
                data: listOrderMap,
            })
        } catch (e) {
            console.error(`Catch Error ${e}`);
            throw `Catch Error ${e}`;
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
                data: orderMap,
            })
        } catch (e) {

            res.json({
                statusMessage: 'badRequest',
                statusCode: 500,
                data: e,
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

            res.json({
                statusMessage: 'success',
                statusCode: 200,
                data: orderMapUpdate,
            });

        } catch (e) {

            res.json({
                statusMessage: 'badRequest',
                statusCode: 500,
                data: e,
            });

        } finally {
            console.log('Close connection');
            await responseDB.close();
        }
    }

    // static async createOrder(req: any, res: any) {
    //     const responseDB = await connection();
    //     const order = req.body;
    //     res.status(200).json();

    // }

    // static async deleteOrder(req: any, res: any) {
    //     const responseDB = await connection();
    //     const id = req.params.id;
    // }
}

export default OrdersFromDB;