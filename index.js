const express = require('express')
const app     = express()
const db      = require('./employee')
const port    = 3000

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({info:'Hello World;'})
});
app.get('/api/staff',db.getStaff)
app.get('/api/staff/:id',db.getStaffById)
app.post('/api/staff',db.addStaff)
app.put('/api/staff/:id',db.updateStaff)
app.delete('/api/staff/:id',db.deleteStaff)

app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`)
});