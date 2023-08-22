const sqlConnect = require('./sqlConnect');

let res_get_users = 
{
    users : [] 
};

const Getdata = (callback) =>
{
    sqlConnect.MessageQuery('select * from testtable;',(rows) =>
    {
        if(rows.length > 0)
        {
            rows.forEach((user)=>
            {
                res_get_users.users.push
                ({
                    userId : user.userId,
                    userPassword : user.userPassword,
                    userName : user.userName,
                });
            });
        }

        var result = '';

        for(var i=0; i < res_get_users.users.length; i++)
        {
        result += res_get_users.users[i].userId;
        result += ' / ';
        result += res_get_users.users[i].userPassword;
        result += ' / ';
        result += res_get_users.users[i].userName;
        
        result += " || ";
        }

        console.log('MoveList보냄');
        
        callback(result);
    });
};

module.exports = {Getdata}