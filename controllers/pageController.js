const { DATE, Op } = require('sequelize/dist');
const {Users, userBoard, Task} = require('../models');

const landingPage = async (req, res) => {
    res.render('users/landingpage', {
        title: "Welcome!"
    })
}
const homePage = async (req, res) => {
   
   
    const totalTask =  await Task.count({
        col: 'id',
        where: {
            user_id: req.session.user_id
        }
    })

    console.log(totalTask)
    const totalBoard =  await userBoard.count({
        col: 'id', 
        where: {
            user_id: req.session.user_id
        }
    })

    const newTasks = await Task.findAll({
        order: [
            ['createdAt', "DESC"]
        ],
        where: {
            user_id: req.session.user_id
        }, 
        limit: 2, 
        raw: true
    })


    if(newTasks.length > 0){
        for (taskCurrent of newTasks){
            let today = new Date()
            // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const new_due_date = new Date(taskCurrent.due_date);
            const duration = Math.floor(Math.abs(new_due_date - today) / (1000 * 60 * 60 * 24));
            taskCurrent.duration = duration
        }
        console.log (taskCurrent.duration);
    }


    const remindTasks = await Task.findAll({
        include: userBoard,
        order: [
            ['due_date', "ASC"]
        ],
        where: {
            [Op.and]: [{ user_id: req.session.user_id}, {status: 'pending'}]
        }, 
        limit: 2
    })

    if(remindTasks.length > 0){
        for (lastDate of remindTasks){
            let today = new Date()
            const new_due_date = new Date(lastDate.due_date);
            const duration = Math.floor(Math.abs(new_due_date - today) / (1000 * 60 * 60 * 24));
            lastDate.duration = duration
        }
    }
    
    res.render('users/home', {
        title: "Home", 
        totalBoard, 
        totalTask, 
        newTasks, 
        remindTasks
    })
}

const loginPage = async  (req, res) => {
    res.render('users/login', {
        title: "Login",
        form: '',
        passwordErr: 'false',
        emailError: 'false',
        message: ''
        
    })
}
const registerPage = async  (req, res) => {
    const errors = 'false'

    res.render('users/register', {
        title: "Register",
        form: '',
        errors: errors,
        message: '',
        emailError: 'false'
    })
}



module.exports = {
    landingPage,
    homePage,
    loginPage,
    registerPage,
}