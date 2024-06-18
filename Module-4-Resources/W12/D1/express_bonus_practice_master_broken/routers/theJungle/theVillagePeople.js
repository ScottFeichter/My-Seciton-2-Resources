const potionStall = (err, req, res, next) => {
    next()
}

const theSmith = (req, res, next) => {
    console.log('Eight')
    next()
}

const theInn = (req, res, next) => {
    console.log('Nine')
    next('You ate too much and got sick D:')
}

const villageElder = (req, res, next) => {
    console.log('Ten')
    next()
}

const escape = (req, res, next) => {
    res.send("You've escaped the jungle!")
}

const bandits = (req, res, next) => {
    console.log('Eight')
    next("You've been robbed!")
}

module.exports = {
    potionStall,
    theSmith,
    theInn,
    villageElder,
    escape,
    bandits
}