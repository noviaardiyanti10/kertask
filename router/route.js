const express = require('express');
const router = express.Router();

const {landingPage, homePage, loginPage, registerPage,} = require('../controllers/pageController');
const  {report, reportUsers} = require('../controllers/reportController');
const  {dashboard, getUser} = require('../controllers/adminController');
const {registrationUser, loginUser, logoutUser}= require('../controllers/userController');
const { boardStore, boardPage, boardDel, boardUpdate } = require('../controllers/boardController');
const { profilePage, profileStore } = require('../controllers/profileController');
const { editTaskPage, createTaskPage, storeTask, updateTask } = require('../controllers/taskController');
const { boardTaskPage, boardTaskDelete } = require('../controllers/boardTaskController');
const { updateList } = require('../controllers/listController');
const {checkLogin, isLogin, landingLogin} = require('../middleware/session');

router.get('/home',checkLogin, homePage);
router.get('/', landingLogin, landingPage);
router.get('/board', checkLogin, boardPage);
router.post('/board', checkLogin, boardStore);
router.delete('/board/:id/', checkLogin, boardDel);
router.post('/board/:id/', checkLogin, boardUpdate);

router.get('/board/:id/task', checkLogin, boardTaskPage);
router.delete('/board/:id/task', checkLogin, boardTaskDelete);

router.get('/login', isLogin, loginPage);
router.post('/login', isLogin, loginUser);
router.get('/logout', checkLogin, logoutUser);
router.get('/register', isLogin, registerPage);
router.post('/register', isLogin, registrationUser);

router.get('/profile', checkLogin, profilePage);
router.post('/profile', checkLogin, profileStore);
router.get('/report', checkLogin, report);

router.get('/task/:id/edit', checkLogin, editTaskPage);
router.post('/task/:id/update', checkLogin, updateTask);
router.get('/task/create',  checkLogin, createTaskPage);
router.post('/create',  checkLogin, storeTask);

router.post('/list/:id/update', checkLogin, updateList);


router.get('/dashboard', checkLogin, dashboard)
router.get('/users', checkLogin, getUser)
router.get('/reports', checkLogin, reportUsers)
module.exports = router;