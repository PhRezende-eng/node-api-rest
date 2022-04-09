import express from 'express';

import Controller from '../controller/products'

const router = express.Router();

router.get('/product', Controller.resGetAllProducts);

router.post('/product', Controller.resPostProduct);

router.get('/product/:id', Controller.resGetCurrentProduct);

router.put('/product/:id', Controller.resPutProduct);

router.delete('/product/:id', Controller.resDeleteProduct);

export default router;