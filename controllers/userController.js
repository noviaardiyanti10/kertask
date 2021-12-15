const {User, Biodata, Role} = require('../models')
const bycriptjs = require('bcryptjs');
const bcryptjs = require('bcryptjs');
const { password, user } = require('pg/lib/defaults');

const registration = async(req, res) => {
    const {full_name, birth_date, phone_number, email, address, password, confirmPassword} = req.body

    const encrypt = await bcryptjs.hash(password, 10)
    const result = checkConfirmation(password, confirmPassword)
    const cekEmail =  await User.findAll({where: {email: email
    }})

    const form = {
        full_name: full_name,
        birth_date: birth_date,
        phone_number: phone_number, 
        email: email, 
        address: address
    }
    
    
    if(result !== true && cekEmail.length > 0 ){
        // console.log(form)
        res.render('users/register',{
            title: "Register", 
            errors: 'true',
            emailError: 'true', 
            form:form,
            message: '*Password dan konfirmasi password tidak sama!', 
            emailMessage: '*Email sudah ada.'
        })
    }   else if(cekEmail.length > 0 ){
        // console.log(form)
        res.render('users/register',{
            title: "Register", 
            emailError: 'true', 
            errors: '',
            form:form,
            emailMessage: '*Email sudah ada.'
        })
        
    }else if(result !== true){
        res.render('users/register',{
            title: "Register", 
            errors: 'true',
            emailError: '', 
            form:form,
            message: '*Password dan konfirmasi password tidak sama!', 
        })

    }else{
            const user = await User.create({
                email: email,
                password: encrypt, 
                role_id: 1
            })
    
            await Biodata.create({
                full_name: full_name,
                birth_date: birth_date,
                phone_number: phone_number, 
                address: address,
                user_id: user.id
            })
    
            res.redirect('/home')
    }


}


function checkConfirmation(password, confirmPassword){
    if(password === confirmPassword){
        return true 
    }else{
        return false
    }
}

function validPassword(password, encrypt) {
    return bcryptjs.compare(password, encrypt)
}

const login= async(req, res) =>{
    const {email, password} = req.body

    const findEmail = await User.findOne({where: {email:email}})
    const form = {
        email: email
    }

    if(!findEmail){
        res.render('users/login',{
            title: "Login", 
            passwordErr: '',
            emailError: 'true', 
            form:form,
            emailMessage: '*Email tidak ditemukan!', 
            message: ''
        })

    }else{
        const name = await Biodata.findOne({where: {user_id:findEmail.id}})
        const result = await validPassword(password, findEmail.password)
        if(result === true){
            if(findEmail.role_id === 1){
                req.session.user_id = findEmail.id
                req.session.email = findEmail.email
                req.session.role_id = findEmail.role_id
                req.session.full_name = name.full_name
                // console.log(req.session.user_id)
                res.redirect('/home')
            }else if(findEmail.role_id === 2){
                req.session.email = findEmail.email
                req.session.role_id = findEmail.role_id
                req.session.full_name = name.full_name
                res.redirect('/')
            }
        }
        else if(result !== 'true'){
            res.render('users/login',{
                title: "Login", 
                passwordErr: 'true',
                emailError: '', 
                form:form,
                message: '*Password yang Anda masukkan salah!' 
            })
        }
    }
}

const logout = async(req, res, next) =>{
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    registrationUser: registration,
    loginUser: login, 
    logoutUser: logout
 };