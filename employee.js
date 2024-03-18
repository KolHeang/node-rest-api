const error = require('./messages')
const con = require('./connect') // conection to database
const DB =con.pool;
const message = new error.Messages;


const getStaff = async (req,res) => {
    try
    {
        const page = req.query.page || null; // Default to page 1 if not specified
        const show = req.query.show || null; // Default to 10 items per page if not specified
        const offset = (page - 1) * show;
        const result = await DB.query("SELECT * FROM employee ORDER BY emp_id DESC limit $1 offset $2 ",[show,offset]);
        res.status(200).json(message.success(result));
    }
    catch(err)
    {
        res.status(500).send(message.error(err.message));
    }
}

const getStaffById = async (req,res) => {
    try
    {
        const {id} = req.params;
        const resutl = await DB.query("select * from employee where emp_id=$1",[id]);
        if(resutl.length){
            res.status(200).json({'status':200,'result':resutl.rows});
        }else{
            res.status(400).json(message.errorId(id));
        }
        
    }
    catch(err)
    {
        
        res.status(500).send(message.error(err.message));
    }
}

const addStaff = async (req,res) => {
    try
    {
        const {fName,lName,gen,bd,email,salary} = req.body;
        if(!fName || !lName || !gen || !bd || !email || !salary)
        {
            res.status(404).send('no data');
        }
        const result = await DB.query("INSERT INTO employee (first_name, last_name, gender, birthdate, email, salary) VALUES($1,$2,$3,$4,$5,$6) RETURNING emp_id",
                            [fName,lName,gen,bd,email,salary]);
        res.status(200).send({insert_employee:result.rows[0].emp_id});
    }
    catch(err)
    {
        res.status(500).send(message.error(err.message));
    }
}

const updateStaff = async (req,res) => {
    try
    {
        const {id} = req.params;
        const {fName,lName,gen,bd,email,salary} = req.body;
        if(!fName || !lName || !gen || !bd || !email || !salary || !id)
        {
            res.status(404).send('error faild');
        }
        const checkId = await DB.query("SELECT emp_id FROM employee WHERE emp_id=$1",[id]);
        if(checkId.length != undefined)
        {
            const result = await DB.query('UPDATE employee SET first_name=$1,last_name=$2,gender=$3,birthdate=$4,email=$5,salary=$6 WHERE emp_id=$7 RETURNING emp_id',
                            [fName,lName,gen,bd,email,salary,id]);
            res.status(200).json({update_employee:result.rows[0].emp_id})
        }
        else
        {
            res.status(400).json(message.errorId(id))
        }
    }
    catch(err)
    {
        res.status(500).send(message.error(err.message));
    }
}

const deleteStaff = async (req,res) =>{
    try
    {
        const {id} = req.params;
        const checkId = await DB.query(`SELECT emp_id FROM employee WHERE emp_id=${id}`);
        if (checkId.length !=undefined) {
            const {resutl} = await DB.query('DELETE FROM employee WHERE emp_id=$1 RETURNING emp_id',[id]);
            res.status(200).json({delete_employee:resutl.rows[0].emp_id})
            
        } else {
            return res.status(400).json(message.errorId(id));
        }
    }
    catch(err)
    {
        res.status(500).send(message.error(err.message));
    }
}

module.exports={
    getStaff,
    getStaffById,
    addStaff,
    updateStaff,
    deleteStaff
}