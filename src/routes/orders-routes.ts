import express from 'express';

import OrdersFromDB from '../controller/orders-controllers';

const router = express.Router();

router.get('/orders/getOrders', OrdersFromDB.getAllOrders);
router.get('/orders/getOrder/:id', OrdersFromDB.getOneOrders);

export default router;