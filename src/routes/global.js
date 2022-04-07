const express = require('express');

const controller = require('../controller/global');

const router = express.Router();

// your routes paths and methods
router.get('/', controller.responseHome);

router.get('/api', controller.responseApi);

module.exports = router;