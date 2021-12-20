const {Users, userBoard, Task, Sequelize} = require('../models');

const store = async (req, res) => {
    const { board_name } = req.body;
    // insert board using userBoard sequelize model with promise
    const board = await userBoard.create({
        board_name,
        user_id: req.session.user_id
    });

    return res.status(200).json({
        message: 'Board created successfully',
    });
}

const index = async (req, res) => {

    // get all boards using userBoard sequelize model with promise
    const boards = await userBoard.findAll({
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("Tasks.id")), "TasksCount"]]
        },
        where:{
            user_id: req.session.user_id 
        },
        include: [{
            model: Task, attributes: []
        }], 
        raw: true,
        group: ["userBoard.id"]
    });
    // console.log(boardsDone)

    res.render('users/board-page', {
        title: "Board",
        boards
    })
}




module.exports = {
    boardStore : store,
    boardPage : index,
}