const express = require('express');
const app = express();
require('dotenv').config();
const { Boardgame, Category, Review, User, sequelize } = require('./db/models');
const { handleGameErrors } = require('./utils');
const usersRouter = require('./routers/users');
const jungleEntrance = require('./routers/theJungle/jungleEntrance');

app.use(express.json());
app.use(usersRouter);

app.get('/boardgames', async(res, req, next) => {
    try {
        const boardgames = await Boardgame.findAll({
            include: [
                {
                    model: Category,
                    attributes: ['name']
                }, 
                {
                    model: Reviews,
                    attributes: ['content', 'rating'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
            order: [['name']]
        })
        res.json(boardgame)
    } catch (err) {
        next(err)
    }
});

app.get('/boardgames/:id', async(req, res, next) => {
    try {
        const boardgame = await Boardgame.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    attributes: ['name']
                },
                {
                    model: Review,
                    attributes: ['content', 'rating'] 
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
        })

        const gameAggData = await Boardgame.findByPk(req.params.gameId, {
            include: Review,
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'averageReviewRating'],
                [sequelize.fn('SUM', sequelize.col('content')), 'reviewCount'],
            ],
            raw: true
        })
        if (!boardgame) {
            res.status(404)
            return res.json({
                status: 404,
                message: "This game could not be found"
            })
        }

        let gameResponse = boardgame.toJSON()
        gameResponse.averageRating = gameAggData.averageReviewRating
        gameResponse.numReviews = gameAggData.reviewCount

        return res.json(gameResponse)
    } catch (err) {
        next(err)
    }
    
})

const gameNameCheck = (req, res, next) => {
    // add errors array property to the request to hold any validation errors
    req.errors = []

    const {name} = req.body
    if  (!name) {
        req.errors.push('All board games must have a name')
    }
    next()
}

const gamePlayersCheck = (req, res, next) => {
    const { maxPlayers } = req.body
    if (!maxPlayers) {
        req.errors.push('All board games must have a maximum players value')
    }
    if (maxPlayers < 1) {
        req.errors.push('A board game must be able to be played by at least 1 player')
    }
    next()
}

const gameCategoryCheck = (req, res, next) => {
    const { categoryId } = req.body
    if (!categoryId) {
        req.errors.push('All board games must be associated with a Category')
    }
    next()
}

const gameValidator = [
    gameNameCheck,
    gamePlayersCheck,
    gameCategoryCheck,
    handleGameErrors
]

app.post('/boardgames', gameValidator, async(req, res, next) => {
    const { name, maxPlayers, categoryId } = req.body
    const game = await Boardgame.create({
        name,
        maxPlayers,
        categoryId
    })
    res.json({
        message: "Game successfully created",
        game
    })
})

app.use('/jungle', jungleEntrance)

app.use((req, res, next) => {
    res.status(404);
    res.json({
        status: 404,
        message: 'The requested page or resource could not be located.'
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: err.stack
    });
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}... :)`));