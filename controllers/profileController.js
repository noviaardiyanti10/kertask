const { localsName } = require('ejs');
const {User, Biodata} = require('../models')
const { Store } = require('express-session');
const multer = require("multer");
const path = require('path');
const { Op } = require('sequelize/dist');


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
        biodata_user, 
        message: req.flash('message')
    })
}

const store = async (req, res) => {
    const {full_name , birth_date, email, phone_number, address} = req.body;

    // update or create biodata model
    let biodata_user = await Biodata.findOne({
        include:[{model: User, attributes: ['email']}],
        where: {
            user_id: res.locals.user_id
        }
    });

    const cekEmail = await User.findAll({
        where: {
            email: email, 
            [Op.not]: {id: res.locals.user_id}
        }
    })

    console.log(cekEmail.length)
    if(cekEmail.length > 0){
        console.log('Email already exists ');
        // req.flash('message', '*Email already exists');
        // res.redirect(`/profile/${biodata_user.id}/update`)
    
    }else{
        await User.update({
            email
        }, {
            where:{
                id: res.locals.user_id
            }
        })
        await Biodata.update({
            // avatar_url: upload,
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
        req.session.full_name = full_name
        res.redirect(`/profile`)

        // return res.status(200).json({
        //     message: 'Profile updated successfully',
        // });
    }
        
}

module.exports = {
    profilePage: index,
    profileStore: store,
}