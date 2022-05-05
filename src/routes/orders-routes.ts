import express from 'express';

import OrdersFromDB from '../controller/orders-controllers';

const router = express.Router();

router.get('/order/getOrders/', OrdersFromDB.getAllOrders);
router.get('/order/getOrder/:id', OrdersFromDB.getOneOrder);
router.put('/order/updateOrder/:id', OrdersFromDB.updateOrder);
router.post('/order/createOrder/', OrdersFromDB.createOrder);
router.delete('/order/deleteOrder/:id', OrdersFromDB.deleteOrder);

export default router;