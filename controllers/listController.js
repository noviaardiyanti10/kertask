const { List, Task } = require('../models');

const update = async (req, res) => {
    const list = await List.findOne({
        where: {
            id: req.params.id
        }
    });    

    await list.update({
        is_complete: !list.is_complete
    });

    const task = await Task.findOne({
        where: {
            id: list.task_id,
        },
        include: [List]
    });
    
    const is_complete = task.Lists.filter(list => list.is_complete === true).length
    const total = task.Lists.length
    const percentage = (is_complete / total) * 100

    // convert percentage to integer
    const percentage = Math.round(percentage)

    await task.update({
        percentage
    })

    return res.status(200).json({
        message: 'List updated successfully'
    });
}

module.exports = {
    updateList: update
}