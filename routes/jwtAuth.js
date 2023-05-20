const router = require('express').Router()
const data = require('../datbase/db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../Utils/jwtGen')
const validinfo = require('../middleware/validinfo')
const authorization = require('../middleware/authorization')
// register

router.post('/register',validinfo,async(req,res)=>{
    try {
        const {name, email, password } = req.body
        const user = await data.query("SELECT * FROM logins WHERE email = $1",[email])

        if (user.rows.length !== 0 ){
            return res.status(401).send("Email already in use")
        }

        // bcrypt the user password
        const saltround = 10
        const salt = await bcrypt.genSalt(saltround)

        const bcryptPassword = await bcrypt.hash(password,salt)

        // enter new user in the database

        const newUser = await data.query("INSERT INTO logins(name, email, password) VALUES($1,$2,$3) RETURNING *",
        [name, email, bcryptPassword])
        res.send(newUser.rows[0])

        // generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({token})

        
    } catch (error) {
        console.error(error.massage);
        res.status(500).send('server error')
    }
})
// login
router.post('/login', validinfo,async(req,res)=>{
    try {
        const {email, password} = req.body
        const user = await data.query("SELECT * FROM logins WHERE email = $1",[email])
        if (user.rows.length === 0){
            return res.status(401).send('Invalid email or password')
            }
            const dbPassword = user.rows[0].password
            const isValid = await bcrypt.compare(password, dbPassword)
            console.log(isValid);
            if (!isValid){
                return res.status(401).send('Invalid email or password')
                }
                const token = jwtGenerator(user.rows[0].user_id)
                res.json({token})
            } catch (error) {
             console.error(error.massage);
                res.status(500).send('server error')
             }
})

router.post('/is-verify', authorization, async(req,res)=>{
    try {
        res.json(true);
    } catch (error) {
        console.error(error.massage);
    }
})






module.exports = router;