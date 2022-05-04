import connection from '../database/connection';

import OrdersPromises from '../database/module/orders-promises';

class OrdersFromDB {
    static async getAllOrders(req: any, res: any) {
        const responseDB = await connection();

        try {
            const listOrderMap = await OrdersPromises.readAllOrders(responseDB);

            res.status(200).json({
                status: "success",
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

    static async getOneOrders(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;

        try {
            const orderMap = await OrdersPromises.readOneOrder(responseDB, id);

            res.status(200).json({
                status: "success",
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
}

export default OrdersFromDB;