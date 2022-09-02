const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');

const bodyParser = require('body-parser');

const { List, Task } = require('./db/models');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/lists', (req, res) => {
    // res.send('Server is running fine.');

    List.find({}).then((lists) => {
        res.send(lists);
    })
});

app.post('/lists', (req, res) => {

    let title = req.body.title;
    let newList = new List({
        title
    });

    newList.save().then((listDoc) => {
        res.send(listDoc);
    });

});

app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
});

app.delete('/lists/:id', (req, res) => {
    List.findByIdAndRemove({_id: req.params.id}).then((removerListDoc) => {
        res.send(removerListDoc);
    })
});

app.get('/lists/:listId/task', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

app.post('/lists/:listId/task', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
});

app.patch('/lists/:listId/task/:taskId', (req, res) => {
    Task.findByIdAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },
    {
        $set: req.body
    }).then(() => {
        res.send({message: 'Completed Successfully.'});
    })
});

app.delete('/lists/:listId/task/:taskId', (req, res) => {
    Task.findByIdAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.get('/lists/:listId/task/:taskId', (req, res) => {
    Task.find({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
})

app.listen(7000, () => {
    console.log("Server is running on PORT 7000.");
})