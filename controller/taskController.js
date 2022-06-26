const db = require('../models');
const Task = db.task;
const httpError = require("http-errors");

exports.list_all = function (req, res, next) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err)
        res.json(task)
    }).catch((err) => {
        next(httpError(500, "Error trying to find all task", err));
    });
};

exports.get_by_id = function (req, res) {
    Task.findById(req.params.id, function(err, task) {
        if (err)
            res.send(err)
        res.json(task)
    });
}

exports.get_by_name = function (req, res) {
    Task.find({}, 'name', req.params.name, function(err, task) {
        if (err)
            res.send(err)
        res.json(task)
    });
}

exports.create = function (req, res) {

    if(Object.keys(req.body).length === 0) {
        res.status(400).send("Miss info to create a task");
        return;
    }

    /*  #swagger.parameters['any_name'] = {
               in: 'body',
               description: 'Task info'
        }
    */
    const task = new Task(req.body);

    try {
        task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.update = async (req, res) => {
    /*  #swagger.parameters['any_name'] = {
               in: 'body',
               description: 'Task info'
        }
    */
    try {
        let taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!taskUpdated) {
            res.status(404).send(`The task ${res.params.id} doesnt exists`);
        }
        res.status(200).send(taskUpdated._update);
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.delete = async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).send(`The task ${req.params.id} doesnt exists`);
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
}