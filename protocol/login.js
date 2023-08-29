const sqlConnect = require('../sqlConnect');

let res_let = 
{
    users : [] 
};

const CheckEmail = (callback, email) =>
{
    var mss = email.split('@');
    console.log('select * from checkaccount where email = "' + mss[0] + '\@' + mss[1] +'";');
    try{
        sqlConnect.MessageQuery('select * from checkaccount where email like "' + mss[0] + '\@' + mss[1] +'";',(rows) =>
        {
            console.log(rows);
            var result = 'true';
            if(rows.length > 0)
            {
                result = 'repeat';
            }
        
            console.log(result);
        
            callback('Check_Email/' + result);
        });
    }
    catch(err){
    console.log('CheckEmailError');
    console.log(err.message);
    }
};

const AddId = (callback,id,pwd,email) =>
{
    console.log(email);
    var mss = email.split('@');
    console.log('insert into checkaccount(email) values ("' + mss[0] + '\@' + mss[1] + '");');
    try{
        sqlConnect.MessageQuery('insert into checkaccount(email) values ("' + mss[0] + '\@' + mss[1] + '");',() =>
        {
            console.log('이메일 저장');
            callback('이메일 저장완료');
            sqlConnect.MessageQuery('insert into useraccount(Id,pwd) values ("' + id + '","' + pwd + '");',(row) =>
            {
                console.log('id 추가');
                callback('Add_ID/');
            });
        });
    }
    catch(err)
    {
    console.log(err.message);
    }
};


const CheckLogin = (callback, id, pwd) =>
{
    try{
        sqlConnect.MessageQuery('select * from useraccount where Id = "' + id +'" and pwd = "' + pwd + '";',(rows) =>
        {
            var result = "false";
            if(rows.length > 0)
            {
                result = "true";
            }

            console.log('Check_Login/' + result);

            callback('Check_Login/' +result);
        });
    }catch(err){
        console.log('로그인 체크 에러');
        console.log(err.message);
    }
};



module.exports = {CheckLogin,CheckEmail,AddId}