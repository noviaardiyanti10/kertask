const db = require('../models/index');

const edit = (req, res) => {
    res.render('users/task/edit', {
        title: "Edit"
    })
}

const create = async (req, res) => {
    const boards = await db.userBoard.findAll({
        where: {
            user_id: req.session.user_id
        }
    });

    res.render('users/task/create', {
        title: "Create",
        boards
    })
}

const store = async (req, res) => {

    try {
        // start db transaction
        await db.sequelize.transaction(async (t) => {

            const { board_id, title, description, due_date, start_date, item } = req.body;

            new_due_date = new Date(due_date);
            new_start_date = new Date(start_date);
            const duration = Math.abs(new_due_date - new_start_date) / (1000 * 60 * 60 * 24);

            // insert task using task sequelize model with promise
            const task = await db.Task.create({
                board_id,
                title,
                description,
                status:"pending",
                start_date: new_start_date,
                due_date: new_due_date,
                user_id: req.session.user_id,
                percentage: 0,
                duration: duration
            });

            // insert list using list array sequelize model with promise    
            for (let i = 0; i < item.length; i++) {    
                await db.List.create({
                    task_id: task.id,
                    item: item[i],
                    is_complete: false
                });
            }
        });

        return res.status(200).json({
            message: 'Task created successfully',
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    }
}
module.exports = {
    editTaskPage: edit,
    createTaskPage: create,
    storeTask: store,
};