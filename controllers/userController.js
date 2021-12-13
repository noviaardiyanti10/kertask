const landingPage = (req, res) => {
    res.render('users/landingpage', {
        title: "Welcome!"
    })
}
const homePage = (req, res) => {
    res.render('users/home', {
        title: "Home"
    })
}

const currentBoardPage = (req, res) => {
    res.render('users/current-board', {
        title: "Board"
    })
}
const loginPage = (req, res) => {
    res.render('users/login', {
        title: "Login"
    })
}
const registerPage = (req, res) => {
    res.render('users/register', {
        title: "Register"
    })
}

const profilePage = (req, res) => {
    res.render('users/profile-user', {
        title: "Profile"
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


module.exports = {
    landingPage,
    homePage,
    currentBoardPage,
    loginPage,
    registerPage,
    profilePage,
    updateTaskPage,
    reportPage

}