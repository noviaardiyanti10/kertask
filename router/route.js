const express = require('express');
const router = express.Router();

const {
    landingPage,
    homePage,
    currentBoardPage,
    loginPage,
    registerPage,
    profilePage,
    updateTaskPage,
    reportPage
} = require('../controllers/userController')

const { boardStore, boardPage } = require('../controllers/boardController')

router.get('/', homePage)
router.get('/landing', landingPage)
router.get('/board', boardPage)
router.post('/board', boardStore)
router.get('/current-board', currentBoardPage)
router.get('/login', loginPage)
router.get('/register', registerPage)
router.get('/profile', profilePage)
router.get('/report', reportPage)
router.get('/update-task', updateTaskPage)
module.exports = router