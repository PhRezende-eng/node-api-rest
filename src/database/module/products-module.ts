import { ObjectID } from 'bson';
import { MongoClient } from 'mongodb';


class ProductsModule {
    static async readAllProducts(client: MongoClient) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('products');
        const getAllProducts: any = await getCollection.find({}).toArray();

        if (getAllProducts != null) {
            const products: Array<any> = [];

            for (let product of getAllProducts) {
                product['id'] = product['_id'];
                delete product['_id'];
                products.push(product);
            }

            return products;
        } else {
            throw 'Products not found, is not possible read all products!';
        }
    }

    static async readOneProduct(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('products');

        if (!ObjectID.isValid(`${idFromParams}`)) {
            throw 'Invalid ID!';
        }

        const query = { _id: new ObjectID(`${idFromParams}`) };
        const getOneProduct: any = await getCollection.findOne(query);

        if (getOneProduct != null) {
            getOneProduct['id'] = getOneProduct['_id'];
            delete getOneProduct['_id'];
            return getOneProduct;
        } else {
            throw 'Product not found, is not possible read the product!';
        }
    }

    static async updateOneProduct(client: MongoClient, idFromParams: String, body: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('products');

        if (!ObjectID.isValid(`${idFromParams}`)) {
            throw 'Invalid ID!';
        }

        const query = { _id: new ObjectID(`${idFromParams}`) };
        const updateProduct = await getCollection.updateOne(query, { $set: body });

        if (updateProduct.matchedCount > 0) {
            const getProduct: any = await getCollection.findOne(query);

            getProduct['id'] = getProduct['_id'];
            delete getProduct['_id'];
            return getProduct;
        } else {
            throw 'Product not found, is not possible update the product!';
        }
    }

    static async createOneProduct(client: MongoClient, body: any) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('products');
        const createProduct = await getCollection.insertOne(body);

        if (createProduct.insertedId != null) {
            const query = { _id: body['_id'] };
            const getNewProduct: any = await getCollection.findOne(query);

            getNewProduct['id'] = getNewProduct['_id'];
            delete getNewProduct['_id'];
            return getNewProduct;
        } else {
            throw 'Product not inserted, is not possible post the product!';
        }
    }

    static async deleteOneProduct(client: MongoClient, idFromParams: String) {
        const result = client.db('ShopProject');
        const getCollection = result.collection('products');

        if (!ObjectID.isValid(`${idFromParams}`)) {
            throw 'Invalid ID!';
        }

        const query = { _id: new ObjectID(`${idFromParams}`) };
        const getProduct: any = await getCollection.findOne(query);

        if (getProduct != null) {
            await getCollection.findOneAndDelete(query);

            getProduct['id'] = getProduct['_id'];
            delete getProduct['_id'];
            return getProduct;
        } else {
            throw 'Product not found, is not possible delete the product!';
        }
    }
}

export default ProductsModule;
