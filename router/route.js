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
} = require('../controllers/pageController');


const {registrationUser, loginUser, logoutUser}= require('../controllers/userController');


const { boardStore, boardPage } = require('../controllers/boardController');
const { profilePage, profileStore } = require('../controllers/profileController');
const {checkLogin, isLogin, landingLogin} = require('../middleware/session');

router.get('/home',checkLogin, homePage);
router.get('/', landingLogin, landingPage);
router.get('/board', checkLogin, boardPage);
router.post('/board', checkLogin, boardStore);

router.get('/current-board', checkLogin, currentBoardPage);
router.get('/login', isLogin, loginPage);
router.post('/login', isLogin, loginUser);
router.get('/logout', checkLogin, logoutUser);
router.get('/register', isLogin, registerPage);
router.post('/register', isLogin, registrationUser);

router.get('/profile/:id/update', checkLogin, profilePage);
router.post('/profile/:id/update', checkLogin, profileStore);
router.get('/report', checkLogin, reportPage);
router.get('/update-task', checkLogin, updateTaskPage);
module.exports = router;