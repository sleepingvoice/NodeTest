const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool
({
  host: 'localhost',
  user: 'Server',
  database: 'DefenceGame',
  password: '123456789',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getconnectionPool = async (callback) => 
{
    pool.getConnection((err,conn) => 
    {
        if(!err) {
            callback(conn)
            conn.release();
        }
        else
        {
            console.error('Error getting connection : ',err);
        }
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