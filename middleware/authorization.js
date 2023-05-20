const jst = require('jsonwebtoken')
require('dotenv').config()


module.exports= async(req,res,next)=>{
    try {
        const jwt = req.header("token");
        if(!jwt){
            return res.status(401).send('Not Authorized')
        }

        const payload = jwt.verify(jwt, process.env.jwtSecret) //the reason for the payload is that if it is succesfull, it will return a payload that we can use for our routes
        req.user = payload.user;
       
    } catch (error) {
        console.error(error.massage);
    }
}