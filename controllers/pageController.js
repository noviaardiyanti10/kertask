const landingPage = (req, res) => {
    res.render('users/landingpage', {
        title: "Welcome!"
    })
}
const homePage = (req, res) => {
    res.render('users/home', {
        title: "Home", 
        
    })
}

const currentBoardPage = (req, res) => {
    res.render('users/current-board', {
        title: "Board"
    })
}
const loginPage = (req, res) => {
    res.render('users/login', {
        title: "Login",
        form: '',
        passwordErr: 'false',
        emailError: 'false',
        message: ''
        
    })
}
const registerPage = (req, res) => {
    const errors = 'false'

    res.render('users/register', {
        title: "Register",
        form: '',
        errors: errors,
        message: '',
        emailError: 'false'
    })
}

const reportPage = (req, res) => {
    res.render('users/report-page', {
        title: "Report"
    })
}
const updateTaskPage = (req, res) => {
    res.render('users/update-task', {
        title: "Update"
    })
}
const createTaskPage = (req, res) => {
    res.render('users/create-task', {
        title: "Create"
    })
}


module.exports = {
    landingPage,
    homePage,
    currentBoardPage,
    loginPage,
    registerPage,
    updateTaskPage,
    createTaskPage,
    reportPage

}