const db = require('../models/index');
// import moment
const moment = require('moment');

const index = async (req, res) => {

    // get board from id with task and list from task
    const board = await db.userBoard.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.Task,
            as: 'Tasks',
            include: [{
                model: db.List,
                as: 'Lists'
            }],
        }],
    });

    res.render('users/board-task/index', {
        title: "Board",
        board
    })
}

const destroy = async (req, res) => {

    // destroy task and list of task from board id
    await db.Task.destroy({
        where: {
            id: req.params.id
        },
        include: [{
            model: db.List,
            as: 'Lists'
        }]
    });

    return res.status(200).json({
        message: 'success'
    });
}

module.exports = {
    boardTaskPage: index,
    boardTaskDelete: destroy
}