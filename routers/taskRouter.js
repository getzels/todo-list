const routes = require('express').Router();
const taskController = require('../controller/taskController')
const {taskCreationValidation, taskIdValidation, taskNameValidation} = require("../helpers/Validation")
const passport = require("passport");
const isLoggedIn = require("../routers/authentication").isLoggedIn;

routes.use(passport.initialize());
routes.use(passport.session());

routes.get('/', isLoggedIn, taskController.list_all);

routes.get('/:id', isLoggedIn, taskIdValidation, taskController.get_by_id);

routes.get('/:name', isLoggedIn, taskNameValidation, taskController.get_by_name);

routes.post('/', taskCreationValidation, taskController.create);

routes.put('/:id', taskIdValidation,  taskCreationValidation, taskController.update);

routes.delete('/:id', taskIdValidation, taskController.delete);

module.exports = routes