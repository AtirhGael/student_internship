const express = require('express')
const cors = require('cors')
const data = require('./datbase/db')
const bodyPerser = require('body-parser')
const jwt = require("jsonwebtoken");

const app = express()
const port = 5000


app.use(express.json())
app.use(cors())


// register routh
app.use('/auth', require('./routes/jwtAuth'))
//home route
app.use('/home', require('./routes/dasboard'))



app.post('/first', async(req, res) => {
    try {
    const {email} = req.body
    const newData = await data.query('INSERT INTO stud (email) VALUES($1) RETURNING *',[email])
    console.log(newData.rows[0]);
    res.send(newData.rows[0])
   } catch (error) {
    console.log(error);
   }
})


app.listen(port, () => console.log(` app listening on port ${port}!`))