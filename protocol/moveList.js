const sqlConnect = require('../sqlConnect');

let res_let = 
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
                res_let.users.push
                ({
                    userId : user.userId,
                    userPassword : user.userPassword,
                    userName : user.userName,
                });
            });
        }

        var result = '';

        for(var i=0; i < res_let.users.length; i++)
        {
        result += res_let.users[i].userId;
        result += ' / ';
        result += res_let.users[i].userPassword;
        result += ' / ';
        result += res_let.users[i].userName;
        
        result += " || ";
        }

        console.log('MoveList보냄');
        
        callback(result);
    });
};

module.exports = {Getdata}