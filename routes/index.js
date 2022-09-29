const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
router.use('/groups', require('./groups'))

module.exports = router;