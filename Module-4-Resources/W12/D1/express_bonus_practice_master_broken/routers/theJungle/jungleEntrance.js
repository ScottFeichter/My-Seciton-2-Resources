const express = require('express');
const router = express.Router();
const journeyDeeper = require('./nextSteps');

const enterTheJungle = (req, res, next) => {
    console.log('One')
    next()
}

const welcomeToTheJungle = (req, res, next) => {
    console.log('Welcome to the Jungle!')
    next()
}

router.use(welcomeToTheJungle)

router.use(journeyDeeper)

router.use(enterTheJungle)

module.exports = router;