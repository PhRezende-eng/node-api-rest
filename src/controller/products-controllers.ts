import connection from '../database/connection';
import ProductsModule from '../database/module/products-module';
import { ObjectID } from 'bson';

class ProductsController {
    static async getAllProducts(req: any, res: any) {
        const responseDB = await connection();

        try {
            const listProductMap = await ProductsModule.readAllProducts(responseDB);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                count: listProductMap.length,
                data: listProductMap,
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

    static async getOneProduct(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;

        try {
            const productMap = await ProductsModule.readOneProduct(responseDB, id);
            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: productMap,
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

    static async updateProduct(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;
        const body = req.body;

        try {
            const productMapUpdate = await ProductsModule.updateOneProduct(responseDB, id, body);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: productMapUpdate,
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

    static async createProduct(req: any, res: any) {
        const responseDB = await connection();

        const id = new ObjectID();
        const product = req.body;

        product['_id'] = id;

        try {
            const createProductResponse = await ProductsModule.createOneProduct(responseDB, product);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: createProductResponse,
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

    static async deleteProduct(req: any, res: any) {
        const responseDB = await connection();
        const id = req.params.id;

        try {
            const deleteProductResponse = await ProductsModule.deleteOneProduct(responseDB, id);

            res.status(200).json({
                statusMessage: 'success',
                statusCode: 200,
                data: deleteProductResponse,
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

export default ProductsController;