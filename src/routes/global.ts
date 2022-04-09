import express from 'express';

import Controller from '../controller/global';

const router = express.Router();

// your routes paths and methods
router.get('/', Controller.resHome);

router.get('/api', Controller.resApi);

export default router;