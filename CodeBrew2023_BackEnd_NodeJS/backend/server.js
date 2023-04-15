const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const user_route = require('./router/user/index');
const api_route = require('./router/api/index')

const express = require('express');

const cors = require('cors');



//Connect db
require('./model/db');
//Start auto_admin server
// require('./process/auto_admin')


try {
    const app = express();
    const port = process.env.PORT || 3000;

    //Allow API call from the same local host
    const corsOptions = {
        origin: process.env.CROSS_ORIGIN, 
        credentials:true,            
        optionSuccessStatus:200
    }

    app.use(cors());
    //Parsing request body
    //JSON format
    app.use(bodyParser.json());
    //URL encoded format
    app.use(bodyParser.urlencoded({extended: true}));
    //Multipart form data
    app.use(upload.array());


    // app.use('/api', api_route);
    app.use('/user', user_route);
    app.use('/api', api_route)

    app.listen(port, '0.0.0.0', () => {
        console.log('Server is started on: ', port);
    });
    
} catch(e){
    console.log("Caught");
    console.log(e);
}