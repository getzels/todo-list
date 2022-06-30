const routes = require('express').Router();
const taskController = require('../controller/taskController')
const {taskCreationValidation, taskIdValidation, taskNameValidation} = require("../helpers/Validation")


routes.get('/', taskController.list_all);

routes.get('/:id', taskIdValidation, taskController.get_by_id);

routes.get('/:name', taskNameValidation, taskController.get_by_name);

routes.post('/', taskCreationValidation, taskController.create);

routes.put('/:id', taskIdValidation,  taskCreationValidation, taskController.update);

routes.delete('/:id', taskIdValidation, taskController.delete);

module.exports = routes