// //require('dotenv').config();
// const request = require("supertest");
// const base_crud = require("../repositories/index");
// const {expect} = require("chai");
// const {accounts} = require("../model/index");
// const {validate_token} = require("../services/index");

// require("../server");

// before(function (done) {
//     setTimeout(done, 8000);
// })


// const main_server = "http://localhost:3001";
// const uri = {
//     register: "/user/register",
//     login: "/user/login",
//     validate_token: "/user/validate_token"
// }


// const CorrectUser = {
//     username: "unittesttest",
//     password: "1234567"
// }

// const WrongUser = {
//     username: "unittesttest",
//     password: "12345678"
// }

// describe("POST register", function(){
//     after(async function(){
//         await accounts.deleteMany({});
//     });
//     it("should register accounts if no previous username", async function(){
//         const res = await request(main_server)
//                 .post(uri["register"])
//                 .send(CorrectUser)
//                 .set('Accept', 'application/json')
//                 .expect(201);
//         expect(res.text).to.be.equal("true");
//         const check = await accounts.estimatedDocumentCount(CorrectUser);
//         expect(check).to.be.equal(1);
//     });

//     it("should fail if account already exists", async function(){
//         const res = await request(main_server)
//                 .post(uri["register"])
//                 .send(CorrectUser)
//                 .set('Accept', 'application/json')
//                 .expect(400);
//         expect(res.text).to.be.equal("false");
//     });
// });

// describe("Test login", function(){
//     before(async function(){
//         await request("http://localhost:3001")
//         .post("/user/register")
//         .send(CorrectUser)
//         .expect(201);
//     });
//     after(async function(){
//         await accounts.deleteMany({});
//     });
//     let login_process = (user, valid) => {return async function(){
//         let number;
//         if (valid){
//             number = 201;
//         } else {
//             number = 400
//         }
//         const response = (await request("http://localhost:3001")
//         .post("/user/login")
//         .send(user)
//         .set('Accept', 'application/json')
//         .expect(number)).text;

//         if (valid){
//             expect(response).not.equal("false");
//         } else {
//             expect(response).equal("false");
//         }
        
//         if (response != false){
//             const check = (await request("http://localhost:3001")
//             .post("/user/validate_token")
//             .send({token: response})
//             .expect(number)).text;

//             if (valid){
//                 expect(check).not.equal("false");
//             } else {
//                 expect(check).equal("false");
//             }
//         }
//     }};
//     it("Allow login with valid username + password, then return valid JWT", login_process(CorrectUser, true));
//     it("Reject login with wrong password", login_process(WrongUser, false));

// });

