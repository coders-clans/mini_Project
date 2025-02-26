const express = require("express");
const { login, signUp, signOut } = require("../controllers/user");
const userRouter = express.Router();


userRouter.post('/signUp', signUp);
userRouter.post('/login' , login);
userRouter.post('/signout', signOut);


module.exports = userRouter;