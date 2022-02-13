const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'EmployeeDB',
    multipleStatements: true

});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
//Router to GET All emlpoyees detail from the MySQL database
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)

            res.send(rows);
        else
            console.log(err);
    })
});
//Router to GET specific emlpoyee detail from the MySQL database
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to DELETE a emlpoyee's detail
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Employee Record deleted successfully.');
        else
            console.log(err);
    })
});

//Router to INSERT/POST a employyes detail
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID= ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode,@Salary)";

    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('gooooood');
        else
            console.log(err);
    })
});