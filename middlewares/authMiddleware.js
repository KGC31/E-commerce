const User = require('../models/userModel')
const jwt  = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
                console.log(decodedToken)
                const user = await User.findById(decodedToken?.id)
                req.user = user;
                next();
            }
        }
        catch(error){
            throw new Error("Not authorized token. Please login again");
        }
    }
    else{
        throw new Error("There is no token attached to header")
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const {email} = req.user;
    const user = await User.findOne({email: email});
    if(user.isAdmin != true){
        throw new Error("You are not an admin")
    }
    else{
        next();
    }

})
module.exports = {authMiddleware, isAdmin}