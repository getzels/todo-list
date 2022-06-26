const { check } = require('express-validator');

exports.taskCreationValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Please include a description of the task').not().isEmpty().isLength({min: 10}),
    check('startTime', 'A task mush hava a start time').isDate().not().isEmpty()
]

exports.taskIdValidation = [
    check('id', 'Task id is required').not().isEmpty()
]

exports.taskNameValidation = [
    check('name', 'Task id is required').not().isEmpty()
]

