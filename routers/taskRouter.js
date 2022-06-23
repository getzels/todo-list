const routes = require('express').Router();
const taskController = require('../controller/taskController')

routes.get('/', taskController.list_all);

routes.get('/:contactId', taskController.get_by_id);

routes.post('/', taskController.create);

routes.put('/:contactId', taskController.update);

routes.delete('/:contactId', taskController.delete);

module.exports = routes