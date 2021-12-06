const express = require('express');
const router = express.Router();
const {
    landingPage,
    homePage,
    boardPage,
    currentBoardPage,
    loginPage,
    registerPage,
    profilePage,
    updateTaskPage,
    reportPage
} = require('../controllers/userController')

router.get('/', homePage)
router.get('/landing', landingPage)
router.get('/board', boardPage)
router.get('/current-board', currentBoardPage)
router.get('/login', loginPage)
router.get('/register', registerPage)
router.get('/profile', profilePage)
router.get('/report', reportPage)
router.get('/update-task', updateTaskPage)
module.exports = router