const sqlConnect = require('../sqlConnect');

let res_let = 
{
    users : [] 
};

const Getdata = (callback,id) =>
{
    var querystr = 'select * from movelist';
    if(id != 0)
        querystr += ' where id = ' + id;
    sqlConnect.MessageQuery(querystr,(rows) =>
    {
        if(rows.length > 0)
        {
            rows.forEach((user)=>
            {
                res_let.users.push
                ({
                    id : user.id,
                    value : user.value
                });
            });
        }

        var result = '';

        result += res_let.users[0].id;
        result += ' / ';
        result += res_let.users[0].value;

        for(var i=1; i < res_let.users.length; i++)
        {
            result += " || ";
            result += res_let.users[i].id;
            result += ' / ';
            result += res_let.users[i].value;
        }

        console.log('MoveList보냄');
        
        callback('Get_MoveList/' + result);
    });
};

const Setdata = (callback, data) =>
{
    sqlConnect.MessageQuery('insert into movelist(value) values ("' + data + '");',() =>
    {
        console.log('MoveList저장');
        callback('Set_MoveList/');
    });
};

module.exports = {Getdata,Setdata}