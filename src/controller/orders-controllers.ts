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
            console.error(`Catch Error ${e}`);
            throw `Catch Error ${e}`;
        } finally {
            console.log('Close connection');
            await responseDB.close();
        }
    };

    static async updateOrder(req: any, res: any) {
        const responseDB = await connection();
        const id = parseInt(req.params.id);
        const body = req.body;

        try {
            const orderMapUpdate = await OrdersModule.updateOneOrder(responseDB, id, body);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: res.status,
                data: orderMapUpdate,
            });

        } catch (e) {
            console.log(`Catch error ${e}`);
            throw `Catch error ${e}`;
        } finally {
            console.log('Close connection');
            await responseDB.close();
        }
    }
    static async createOrder(req: any, res: any) {
        const responseDB = await connection();
        const order = req.body;
        res.status(200).json();

    }

    static async deleteOrder(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;
    }
}

export default OrdersFromDB;