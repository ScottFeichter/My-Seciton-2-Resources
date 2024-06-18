const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Four')
    next()
})

module.exports = router;