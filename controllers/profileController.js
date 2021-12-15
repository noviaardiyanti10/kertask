const { localsName } = require('ejs');
const {User, Biodata} = require('../models')
const { Store } = require('express-session');
const multer = require("multer");
const path = require('path');


const index = async (req, res) => {
    // console.log(res.locals.user_id)
    // get data biodata from model
    let biodata_user = await Biodata.findOne({
        include:[{model: User, attributes: ['email']}],
        where: {
            user_id: res.locals.user_id
        }
    });

    res.render('users/profile-user', {
        title: "Profile",
        biodata_user
    })
}

const store = async (req, res) => {
    const {full_name , birth_date, email, phone_number, address} = req.body;

    const diskStorage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, "public/user-photos"));
        },
    
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    });
    

    // update or create biodata model
    let biodata_user = await Biodata.findOne({
        include:[{model: User, attributes: ['email']}],
        where: {
            user_id: res.locals.user_id
        }
    });
    multer({ storage: diskStorage }).single("photo");
    const file = req.file.path;

    if(!biodata_user){
        console.log('not found')
    }else{
        await User.update({
            email
        }, {
            where:{
                id: res.locals.user_id
            }
        })
        await Biodata.update({
            avatar_url: req.file.path,
            full_name,
            birth_date,
            email,
            phone_number,
            address
        }, {
            where: {
                user_id: res.locals.user_id
            }
        })

    }
    

    return res.status(200).json({
        message: 'Profile updated successfully',
    });
}

module.exports = {
    profilePage: index,
    profileStore: store,
}