// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();
const {Op } = require('sequelize');

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();
require('express-async-errors');

// Import the models used in these routes - DO NOT MODIFY
const { Musician, Band, Instrument } = require('./db/models');

// Express using json - DO NOT MODIFY
app.use(express.json());


app.get('/musicians', async (req, res, next) => {
    // Parse the query params, set default values, and create appropriate
    // offset and limit values if necessary.
    // Your code here
    let { size, page } = req.query;

    if (!page) page = 1;
    if (!size) size = 1;

    if(page < 1 || size < 1) {
        page = 1;
        size = 1;
    }

    const pagination = {};

    if (size > 0 && page > 0) {
        pagination.limit = parseInt(size)
        pagination.offset = parseInt(size) * (parseInt(page) - 1)
    }


    // Query for all musicians
    // Include attributes for `id`, `firstName`, and `lastName`
    // Include associated bands and their `id` and `name`
    // Order by musician `lastName` then `firstName`
    const musicians = await Musician.findAll({
        order: [['lastName'], ['firstName']],
        attributes: ['id', 'firstName', 'lastName'],
        include: [{
            model: Band,
            attributes: ['id', 'name']
        }],
        ...pagination
    });

    res.json(musicians)
});


// BONUS: Pagination with bands
app.get('/bands', async (req, res, next) => {
    // Parse the query params, set default values, and create appropriate
    // offset and limit values if necessary.
    // Your code here
    let {page, size} = req.query;

    page = page === undefined ? 1 : +page;
    size = size === undefined ? 3 : +size;

    const pagination = {};

    if (page >=1 && size >=1) {
        pagination.limit = parseInt(size)
        pagination.offset = parseInt(size) * (parseInt(page) - 1)
    }

    // Query for all bands
    // Include attributes for `id` and `name`
    // Include associated musicians and their `id`, `firstName`, and `lastName`
    // Order by band `name` then musician `lastName`
    const bands = await Band.findAll({
        order: [['name'], [Musician, 'lastName']],
        attributes: ['id', 'name'],
        include: [{
            model: Musician,
            attributes: ['id', 'firstName', 'lastName']
        }],
        // add limit key-value to query
        // add offset key-value to query
        // Your code here
        ...pagination
    });

    res.json(bands)
});


// BONUS: Pagination with instruments
app.get('/instruments', createPaginationObjectMiddleWare, async (req, res, next) => {

    const instruments = await Instrument.findAll({
        order: [['type'], [Musician, Band, 'name'], [Musician, 'lastName']],
        attributes: ['id', 'type'],
        include: [{
            model: Musician,
            attributes: ['id', 'firstName', 'lastName'],
            // Omit the join table (MusicianInstruments) attributes
            through: { attributes: [] },
            include: [{
                model: Band,
                attributes: ['id', 'name']
            }]
        }],
    });

    res.json(instruments)
});

// ADVANCED BONUS: Reduce Pagination Repetition
// Your code here

function createPaginationObjectMiddleWare(defaultSize=5, defaultPage=1) {
    return function createPaginationObject(req, res, next) {

        page = page === undefined ? defaultPage : +page;
        size = size === undefined ? defaultSize : +size;

        const pagination = {};

        if (page >=1 && size >=1) {
            pagination.limit = parseInt(size)
            pagination.offset = parseInt(size) * (parseInt(page) - 1)
        }

        req.pagination = pagination;
        next();
    }
}


//-----------

const { Op } = require('sequelize');

const { title, imageId, userId } = req.query;

const queryObj = {
    where: {},
    include: []
};

if (title) {
    queryObj.where.title = {
        [Op.substring]: title,
    }
}

if (imageId) {
    queryObj.where.imageId = {
        [Op.gte]: imageId,
    }
}

if(userId) {
    queryObj.include.push({
        model: User,
        where: {
            id: userId,
        }
    });
}


const posts = await Post.findAll({...queryObj});

res.json(posts)


//-----------

//-----------




// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
