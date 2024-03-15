const express = require('express')
const app     = express()
const bodyParser=require('body-parser')
const db      = require('./server')
const port    = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
    extended: true,
    })
)
app.get('/',(req,res)=>{
    res.json({info:'Hello World'})
});
app.get('/api/staff',db.getStaff)
app.get('/api/staff/:id',db.getStaffId)
app.post('/api/staff',db.addStaff)

app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`)
});