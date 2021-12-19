const db = require('../models/index');

const store = async (req, res) => {
    const { board_name } = req.body;
    // insert board using userBoard sequelize model with promise
    const board = await db.userBoard.create({
        board_name,
        user_id: req.session.user_id
    });

    return res.status(200).json({
        message: 'Board created successfully',
    });
}

const index = async (req, res) => {

    // get all boards using userBoard sequelize model with promise
    const boards = await db.userBoard.findAll({
        where: {
            user_id: req.session.user_id
        }
    });

    res.render('users/board-page', {
        title: "Board",
        boards
    })
}


module.exports = {
    boardStore : store,
    boardPage : index,
}