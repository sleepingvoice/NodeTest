const sqlConnect = require('../sqlConnect');

let res_let = 
{

};

const Getdata = (callback, id) =>
{
    sqlConnect.MessageQuery('select * from testtable where is ' + id +';',(rows) =>
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

const Setdata = (callback, data) =>
{
    sqlConnect.MessageQuery('insert into movelist(value) values ("' + data + '");',() =>
    {
        console.log('MoveList저장');
        callback('MoveList 저장됨');
    });
};

module.exports = {Getdata,Setdata}