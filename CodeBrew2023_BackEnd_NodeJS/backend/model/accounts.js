//Load .env variables
//require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        match: /^([a-z|A-Z|0-9]*)$/i
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
    // storage: [{
    //     label: String,
    //     expiry: Date,
    //     brand: String,
    // }]
    
})

UserSchema.pre('save', async function(next){

    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})


UserSchema.methods.genToken = async function(){
    const user = this;
    token = jwt.sign({username: user.username}, process.env.SYS_SECRET_KEY, {expiresIn: '2 hours'});
    return(token);
}

const User = mongoose.model('user', UserSchema);


// test = async() => {
//     const new_user = new User({
//         username: "CodeBruh",
//         password: "1234567",
//         email: "a@gmail.com",
//     })
//     await new_user.save(); 
//     console.log('done');
// }

// try{
//     test();
// }catch(e){
//     console.log(e);
// }


module.exports = User;