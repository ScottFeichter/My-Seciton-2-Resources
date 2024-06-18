const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { User } = require('../db/models');
const { handleValidationErrors } = require('../utils');

// Check out the npm documentation for the "express-validator" package
// You can start here: https://www.npmjs.com/package/express-validator :)
const signupValidator = [
    check('username')
        .exists({ checkFalsey: true })
        .isLength({ min: 3 })
        .withMessage("Your username must exist and be at least 3 characters long"),
    check('email')
        .exists({ checkFalsey: true })
        .withMessage('You must have an email address to sign up'),
    check('password')
        .exists({ checkFalsey: true })
        .isLength({ min: 7 })
        .withMessage("Your Password must exist and be at least 10 characters long"),
        handleValidationErrors
]

const userDeleteValidator = (req, res, next) => {
    if (req.params.id !== req.body.userId) {
        const err = new Error('You can only delete your own user account')
        err.status = 403
        err.title = 'Access denied'
        next(err)
    }
    next()
}

// request body must contain a username, an email and a password
// request body may optionally contain a faveCategoryId
router.post('/signup', signupValidator, async(req, res, next) => {
    const {username, email, password, faveCategoryId} = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
            faveCategoryId: faveCategoryId || null
        })
        return
        res.json({
            message: 'New User created',
            user
        })

    } catch (err) {
        next(err)
    }
})

// request body must contain a userId that matches the id route parameter
router.delete('/:id/destroy', userDeleteValidator, async(req, res, next) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        await user.destroy()
        return res.json({
            message: "User successfully destroyed",
            user
        })
    }
    res.status(404)
    return res.json({
        status: 404,
        message: 'This user could not be found'
    })
})


module.exports = router;
