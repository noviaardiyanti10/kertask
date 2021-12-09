const db = require('../models/index');

const store = async (req, res) => {
    const { board_name } = req.body;
    // insert board using userBoard sequelize model with promise
    const board = await db.userBoard.create({
        board_name,
        user_id: 1
    });

    return res.status(200).json({
        message: 'Board created successfully',
    });
}


module.exports = {
    boardStore : store,
}