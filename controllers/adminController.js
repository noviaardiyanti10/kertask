const {User, Biodata, Task, userBoard} = require('../models');

const dashboard = async(req, res) =>{

    totalUser =  await Biodata.count({col: 'id'})
    totalBoard =  await userBoard.count({col: 'id'})
    totalTask =  await Task.count({col: 'id'})

    res.render('admin/dashboard', {
        title: 'Dashboard', 
        totalBoard,
        totalTask,
        totalUser
    })
}
const getUser = async(req, res) =>{

    const biodatas = await Biodata.findAll({
        include: User
    })


    res.render('admin/getUser', {
        title: 'All User', 
        biodatas
    })
}

module.exports = {dashboard, getUser}