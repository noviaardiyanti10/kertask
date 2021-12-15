const checkLogin = (req, res, next) => {
    if (req.session.email === undefined) {
        res.locals.loggedIn = false;
        res.redirect('/')
    } else {
        res.locals.user_id = req.session.user_id;
        res.locals.email = req.session.email;
        res.locals.role_id = req.session.role_id;
        res.locals.full_name = req.session.full_name;
        res.locals.loggedIn = true;
        next();
    }
}
const landingLogin = (req, res, next) => {
    if (req.session.email === undefined) {
        res.locals.loggedIn = false;
        next();
    } else {
        res.locals.user_id = req.session.user_id;
        res.locals.email = req.session.email;
        res.locals.role_id = req.session.role_id;
        res.locals.full_name = req.session.full_name;
        res.locals.loggedIn = true;
        next();
    }
}



const isLogin = (req, res, next) => {
    if (req.session.email === undefined) {
        res.locals.loggedIn = false;
        next();

    } else {
        res.locals.user_id = req.session.user_id;
        res.locals.email = req.session.email;
        res.locals.full_name = req.session.full_name;
        res.locals.loggedIn = true;
        if(req.session.role_id === 1){
            res.locals.role_id = req.session.role_id
            res.redirect('/home')
        }else if(req.session.role_id === 2){
            res.locals.role_id = req.session.role_id
            res.redirect('/')
        }
       
    }
}


module.exports = {isLogin, checkLogin, landingLogin}