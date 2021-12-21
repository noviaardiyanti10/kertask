const { List } = require('../models');

const update = async (req, res) => {
    const list = await List.findOne({
        where: {
            id: req.params.id
        }
    });

    await list.update({
        is_complete: !list.is_complete
    });

    return res.status(200).json({
        message: 'List updated successfully'
    });
}

module.exports = {
    updateList: update
}