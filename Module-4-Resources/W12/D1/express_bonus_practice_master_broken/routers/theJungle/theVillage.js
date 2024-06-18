const express = require('express');
const router = express.Router();
const { potionStall, theSmith, theInn, villageElder, escape, bandits } = require('./theVillagePeople')

router.use(potionStall)
router.use(bandits)
router.use(escape)
router.use(theSmith)
router.use(theInn)
router.use(villageElder)

module.exports = router;