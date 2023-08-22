const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool
({
  host: 'localhost',
  user: 'Testuser',
  database: 'test',
  password: '123456789',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getconnectionPool = async (callback) => 
{
    pool.getConnection((err,conn) => 
    {
        if(!err) 
            callback(conn)
        conn.release();
    });
}


exports.MessageQuery = (sqlMessage, callback) =>
{
    getconnectionPool((conn) =>
    {
        conn.query(sqlMessage , (err,doc) =>
        {
            if(err)
                console.log(err)
            callback(doc);
        })
    });
};