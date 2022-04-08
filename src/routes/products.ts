import express from 'express';

import controller from '../controller/products'

const router = express.Router();

router.get('/api/products', controller.resGetAllProducts);

router.post('/api/products', controller.resPostProduct);

router.put('/api/products/:id', controller.resPutProduct);


export default router;