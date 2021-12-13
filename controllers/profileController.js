const { Store } = require('express-session');
const db = require('../models/index');


const index = async (req, res) => {

    // get data biodata from model
    let profile = await db.Biodata.findOne({
        where: {
            user_id: 1
        }
    });
    
    res.render('users/profile-user', {
        title: "Profile",
        profile
    })
}

const store = async (req, res) => {
    const { full_name , birth_date, email, phone_number, address} = req.body;

    // update or create biodata model
    const biodata = await db.Biodata.findOne({
        where: {
            user_id: 1
        }
    });

    if(biodata){
        await biodata.update({
            full_name,
            birth_date,
            email,
            phone_number,
            address
        })
    }else{
        await db.Biodata.create({
            full_name,
            birth_date,
            email,
            phone_number,
            address,
            user_id: 1
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