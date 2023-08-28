const sqlConnect = require('../sqlConnect');

let res_let = 
{
    users : [] 
};

const CheckEmail = (callback, email) =>
{
    var mss = email.split('@');
    console.log('select * from checkaccount where email = "' + mss[0] + '\@' + mss[1] +'";');
    sqlConnect.MessageQuery('select * from checkaccount where email like "' + mss[0] + '\@' + mss[1] +'";',(rows) =>
    {
        console.log(rows);
        var result = 'null';
        if(rows.length > 0)
        {
            result = 'repeat';
        }

        console.log(result);
        
        callback(result);
    });
};

const AddId = (callback,id,pwd,email) =>
{
    console.log(email);
    var mss = email.split('@');
    console.log('insert into checkaccount(email) values ("' + mss[0] + '\@' + mss[1] + '");');
    sqlConnect.MessageQuery('insert into checkaccount(email) values ("' + mss[0] + '\@' + mss[1] + '");',() =>
    {
        console.log('이메일 저장');
        callback('이메일 저장완료');
        sqlConnect.MessageQuery('insert into useraccount(Id,pwd) values ("' + id + '","' + pwd + '");',(row) =>
        {
            console.log('id 추가');
            callback('id 추가 완료');
        });
    });
};


const CheckLogin = (callback, id, pwd) =>
{
    sqlConnect.MessageQuery('select * from useraccount where Id = "' + id +'" and pwd = "' + pwd + '";',(rows) =>
    {
        var result = "false";
        if(rows.length > 0)
        {
            result = "true";
        }

        console.log('아이디 확인 결과 : ' + result);

        callback(result);
    });
};



module.exports = {CheckLogin,CheckEmail,AddId}