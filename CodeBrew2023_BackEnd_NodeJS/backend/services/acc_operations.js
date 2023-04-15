const User = require('../model/accounts');
const bcrypt = require('bcrypt');
const {create, getOne} = require('../repositories/index');
//require('dotenv').config();
const jwt = require('jsonwebtoken');




//info_obj: {username, password, privateKey}
const register = async(info_obj) => {
    // console.log(info_obj);
    await create(User, info_obj);
}


const login = async({username, password}) => {
    const user = await getOne(User, {username});
    if (!user){
        throw new Error("No user is found")
    } 

    const valid = await bcrypt.compare(password, user.password); 

    if (!valid) {
        throw new Error("Invalid password")
    }

    const token = await user.genToken();
    return(token);
}

const validate_token = async(token) => {
    const decoded_username = (jwt.verify(token, process.env.SYS_SECRET_KEY)).username;
    const user = await getOne(User, {username: decoded_username});
    if (!user){
        throw new Error("No user is found or user is not logged in")
    }
    return(true)
}

module.exports = {
    login,
    register,
    validate_token
}

// test = async() => {
//     console.log(await login("Khang", "1234567"));
// }

// try{
//     test()
// }catch(e){
//     console.log(e)
// }

