const { NOW } = require('sequelize/dist');
const {User, userBoard, Task, List} = require('../models');
const db = require('../models/index');
const Sequelize = require('sequelize');

const edit = (req, res) => {
    res.render('users/task/edit', {
        title: "Edit"
    })
}

const create = async (req, res) => {
    const boards = await userBoard.findAll({
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
        

    const { board_id, title, description, due_date, start_date, item } = req.body;
    try {

         await db.sequelize.transaction(async(t) => {

            const createTask = await Task.create({
                board_id,
                title,
                description,
                status:"pending",
                start_date: start_date,
                due_date: due_date,
                user_id: req.session.user_id,
                percentage: 0
            }) 

            // insert list using list array sequelize model with promise    
            for (let i = 0; i < item.length; i++) {    
                await List.create({
                    task_id: createTask.id,
                    item: item[i],
                    is_complete: false
                });
            }
        })

        return res.status(200).json({
            message: 'Task created successfully'
        });
    } catch (err) {
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