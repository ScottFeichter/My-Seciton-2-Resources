const express = require('express');
const router = express.Router();
const madeItToAVillage = require('./theVillage');

const onTheRightPath = (req, res, next) => {
    console.log('Seven')
    next('Seven')
}

const onTheLeftPath = (req, res, next) => {
    console.log('Seven')
    next()
}

router.use((req, res, next) => {
    console.log('Six')
    next()
})
router.use(onTheRightPath)
router.use(onTheLeftPath)
router.use(madeItToAVillage)

module.exports = router;