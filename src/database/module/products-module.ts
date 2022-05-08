import { MongoClient } from 'mongodb';


class ProductsModule {
    static async readAllProducts(client: MongoClient) { return []; }

    static async readOneProduct(client: MongoClient, idFromParams: String) { return { id: idFromParams }; }

    static async updateOneProduct(client: MongoClient, idFromParams: String, body: any) { return body; }

    static async createOneProduct(client: MongoClient, body: any) { return body; }

    static async deleteOneProduct(client: MongoClient, idFromParams: String) { return { id: idFromParams }; }
}

export default ProductsModule;
