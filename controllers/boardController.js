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

const update = async(req, res) => {
    const { board_name } = req.body;

    const updateBoard = await userBoard.update({
        board_name
    }, {
        where:{
            id: req.params.id
        }
    })

    return res.status(200).json({
        message: 'Board update successfully',
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


const delBoard = async (req, res) => {

    // destroy task and list of task from board id
    await userBoard.destroy({
        where: {
            id: req.params.id
        }
    });

    return res.status(200).json({
        message: 'success'
    });
}



module.exports = {
    boardStore : store,
    boardPage : index,
    boardDel: delBoard,
    boardUpdate: update
}