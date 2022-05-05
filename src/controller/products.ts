//instance object to test put request
const product = {
    id: 123456789,
    name: 'Opa',
    price: 4.5,
};

// init a empty array of products
const products: any = [product];

// simulate id, init in 0
let id = 0;


class ProductController {
    //list products
    static resGetAllProducts(req: any, res: any) {
        res.status(200).json({
            statusMessage: "success",
            data: { products },
        })
    };

    static resPostProduct(req: any, res: any) {
        //sums 1 to id
        id++;

        // get the body of the request and organize as a new product
        const product = {
            id,
            name: req.body.name,
            price: req.body.price,
        }

        products.push(product);

        console.log('products', products);

        res.status(200).json({
            statusMessage: "success",
            message: 'Product created!',
            data: { product }
        });

        console.log();
    };

    static resPutProduct(req: any, res: any) {
        const { id } = req.params;
        console.log(req.params);

        const { name, price } = req.body;
        console.log(req.body);


        const product = products.find((product: any) => product.id == id);

        if (product) {
            product.name = name;
            product.price = price;
        };

        console.log('products', products);

        res.status(200).json({
            statusMessage: "success",
            message: "Product updated!",
            data: { product },
        });

        console.log();
    };

    static resGetCurrentProduct(req: any, res: any) {
        const { id } = req.params;

        const product = products.find((product: any) => product.id == id);

        res.status(200).json({
            statusMessage: 'success',
            data: { product },
        });
    };

    static resDeleteProduct(req: any, res: any) {
        const { id } = req.params;

        const product = products.find((product: any) => product.id == id);

        if (product) {
            products.splice(products.indexOf(product), 1);
        }

        res.status(200).json({
            statusMessage: 'success',
            message: 'Product deleted!',
        });

    };

};

export default ProductController;