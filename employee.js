const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "123",
    host : "localhost",
    port: 5432,
    database: "postgres"
})

const getStaff = async (req,res) => {
    try
    {
        const result = await pool.query("SELECT * FROM employee ORDER BY emp_id DESC");
        res.status(200).json({'status':200,'total':result.rowCount,'result':result.rows});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send('failed!');
    }
}

const getStaffById = async (req,res) => {
    try
    {
        const {id} = req.params;
        const resutl = await pool.query("select * from employee where emp_id=$1",[id]);
        res.status(200).json({'status':200,'result':resutl.rows});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send('failed!');
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
        const result = await pool.query("INSERT INTO employee (first_name, last_name, gender, birthdate, email, salary) VALUES($1,$2,$3,$4,$5,$6) RETURNING emp_id",
                            [fName,lName,gen,bd,email,salary]);
        res.status(200).send({insert_employee:result.rows[0].emp_id});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send('failed!');
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
        const result = await pool.query('UPDATE employee SET first_name=$1,last_name=$2,gender=$3,birthdate=$4,email=$5,salary=$6 WHERE emp_id=$7 RETURNING emp_id',
                        [fName,lName,gen,bd,email,salary,id]);
        res.status(200).json({update_employee:result.rows[0].emp_id})
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send('failded!');
    }
}

module.exports={
    getStaff,
    getStaffById,
    addStaff,
    updateStaff
}