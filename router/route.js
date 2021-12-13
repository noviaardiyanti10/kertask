const express = require('express');
const router = express.Router();

const {
    landingPage,
    homePage,
    currentBoardPage,
    loginPage,
    registerPage,
    updateTaskPage,
    reportPage
} = require('../controllers/userController')

const { boardStore, boardPage } = require('../controllers/boardController')
const { profilePage, profileStore } = require('../controllers/profileController')

router.get('/', homePage)
router.get('/landing', landingPage)
router.get('/board', boardPage)
router.post('/board', boardStore)
router.get('/current-board', currentBoardPage)
router.get('/login', loginPage)
router.get('/register', registerPage)
router.get('/profile', profilePage)
router.post('/profile', profileStore)
router.get('/report', reportPage)
router.get('/update-task', updateTaskPage)
module.exports = router