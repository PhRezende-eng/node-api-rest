import express from 'express';

import ProdcutsController from '../controller/products-controllers';

const router = express.Router();

router.get('/products/getAllProduct', ProdcutsController.getAllProducts);
router.get('/products/getOneProduct/:id', ProdcutsController.getOneProduct);
router.put('/products/updateProduct/:id', ProdcutsController.updateProduct);
router.post('/products/createProduct', ProdcutsController.createProduct);
router.delete('/products/deleteProduct/:id', ProdcutsController.deleteProduct);

export default router;