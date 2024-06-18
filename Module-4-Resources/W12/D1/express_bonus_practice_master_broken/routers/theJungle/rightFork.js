const express = require('express');
const router = express.Router();
const takeAWellEarnedRest = require('./restSite')

router.use((req, res, next) => {
    console.log('Two')
    next()
})

const checkYourHeading = (req, res, next) => {
    console.log('Three')
    next()
}

const backOnTheTrail = (req, res, next) => {
    console.log('Five')
    next()
}

const stubbedToe = (req, res, next) => {
    next('Stubbed toe')
}

router.use(stubbedToe)
router.use(takeAWellEarnedRest)
router.use(backOnTheTrail)
router.use(checkYourHeading)

module.exports = router;