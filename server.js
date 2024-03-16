const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "123",
    host : "localhost",
    port: 5432,
    database: "postgres"
});

// const getStaff = (req,res) => {
//         pool.query("SELECT * FROM employee ORDER BY emp_id  DESC",(error,results)=>{
//         if(error)
//         {
//             throw error;
//         }
//         res.status(200).json({'status':200,'total':results.rowCount,'result':results.rows});
//     })
// }
const getStaff = async (req,res) => {
    try
    {
        const query = "SELECT * FROM employee ORDER BY emp_id  DESC";
        const results = await pool.query(query);
        res.status(200).json({'status':200,'total':results.rowCount,'result':results.rows});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send('failed');
    }
}

const getStaffId = (req,res) => {
    const id =parseInt(req.params.id)
    pool.query('SELECT * FROM employee WHERE emp_id=$1',[id],(error,results)=>{
        if(error)
        {
            throw error;
        }
        res.status(200).json({'status':200,'result':results.rows});
    })
}

const addStaff = (req,res)=>{
    const { firstName,lastName,gender,birthdate,email,salary}=req.body
    pool.query("INSERT INTO employee (first_name, last_name, gender, birthdate, email, salary) VALUES($1,$2,$3,$4,$5,$6)",
        [firstName,lastName,gender,birthdate,email,salary],(error,results)=>{
        if(error)
        {
            throw error;
        }
        res.status(200).send(`insert employee: ${results.emp_id}`);
    });
}

const updateStaff = (req,res)=>{
    const id=parseInt(req.params.id)
    const { firstName,lastName,gender,birthdate,email,salary}=req.body
    try
    {
        pool.query("UPDATE employee SET first_name=$1, last_name=$2, gender=$3, birthdate=$4, email=$5, salary=$6 WHERE emp_id=$7");
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send('failed');
    }
}

module.exports={
    getStaff,
    getStaffId,
    addStaff
}