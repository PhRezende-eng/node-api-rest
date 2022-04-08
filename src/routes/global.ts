import express from 'express';

import controller from '../controller/global';

const router = express.Router();

// your routes paths and methods
router.get('/', controller.responseHome);

router.get('/api', controller.responseApi);

export default router;