const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};

const handleGameErrors = (req, res, next) => {
    const errArray = req.errors;
    if (errArray.length >= 1) {
        const err = Error('There was at least one error when attempting to create a board game');
        err.errors = errArray;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
}

module.exports = {
    handleValidationErrors,
    handleGameErrors
};
