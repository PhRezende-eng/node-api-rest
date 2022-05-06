import express from 'express';

import OrdersController from '../controller/orders-controllers';

const router = express.Router();

router.get('/order/getOrders/', OrdersController.getAllOrders);
router.get('/order/getOrder/:id', OrdersController.getOneOrder);
router.put('/order/updateOrder/:id', OrdersController.updateOrder);
router.post('/order/createOrder/', OrdersController.createOrder);
router.delete('/order/deleteOrder/:id', OrdersController.deleteOrder);

export default router;