const express = require('express');
const router = express.Router();
const left = require('./leftFork');
const right = require('./rightFork');

// To patch up an injury...
router.use((err, req, res, next) => {
    next()
})

router.use((req, res, next) => {
    console.log('You got lost D:')
    next('You got lost D:')
})

router.use((req, res, next) => {
    console.log('Two')
    next()
})

// A fork in the road...
router.use(left);
router.use(right);



module.exports = router;