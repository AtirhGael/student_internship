const router = require('express').Router()
const data = require('../datbase/db')
const authorization = require('../middleware/authorization')


router.get('/',authorization,async(req,res)=>{
    try {
        // after passing the midleware, the request.user has the payload
        // res.json(req.user)
       const user = await data.query('SELECT* FROM logins WHERE id=$1',[req.user])
       res.json(user.rows[1])
    } catch (error) {
        console.error(error.massage);
    }
})


module.exports=router
