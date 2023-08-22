const sqlConnect = require('../sqlConnect');

let res_let = 
{

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

                });
            });
        }

        var result = '';

        for(var i=0; i < res_let.users.length; i++)
        {

        result += " || ";
        }

        console.log('보냄');
        
        callback(result);
    });
};

module.exports = {Getdata}