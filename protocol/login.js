const sqlConnect = require('../sqlConnect');

const CheckEmail = (callback, email) =>
{
    var mss = email.split('@');
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
        sqlConnect.MessageQuery('select userid from useraccount where Id = "' + id +'" and pwd = "' + pwd + '";',(rows) =>
        {
            var result = "false";
            var resultid = [];
            if(rows.length > 0)
            {
                rows.forEach((values) => resultid.push(values.userid))

                result = id + ":" + resultid;
            }

            console.log('Check_Login/' + result);

            callback('Check_Login/' +result);
        });
    }catch(err){
        console.log('로그인 체크 에러');
        console.log(err.message);
    }
};

const FindID = async(callback,email) =>
{
    var mss = email.split('@');
    try{
        await sqlConnect.MessageQuery('select * from checkaccount where email like "' + mss[0] + '\@' + mss[1] +'";', (rows)=>
        {
            var result = [];
            if(rows.length > 0)
            {
                rows.forEach((user)=>
                {
                    sqlConnect.MessageQuery('select * from useraccount where userid = ' + user.userid + ';',(rows) =>
                    {
                        rows.forEach((values) => result.push(values.Id))
                        
                         console.log(result);

                        callback('Find_ID/' + result);
                    });
                });
            }
            else
            {
                callback('Find_ID/false');
            }
        })
    }catch(err){
        console.log("ID찾기 오류")
        console.log(err.message);
    }
}

const FindPwd = async(callback,id,email) =>
{
    var mss = email.split('@');
    try{
        await sqlConnect.MessageQuery('select * from checkaccount where email like "' + mss[0] + '\@' + mss[1] +'";', (rows)=>
        {
            var result = [];
            if(rows.length > 0)
            {
                rows.forEach((user)=>
                {
                    sqlConnect.MessageQuery('select * from useraccount where userid = ' + user.userid + ' and Id = "' + id + '" ;',(rows) =>
                    {
                        rows.forEach((values) => result.push(values.pwd))
                        
                         console.log(result);

                        callback('Find_Pwd/' + result);
                    });
                });
            }
            else
            {
                callback('Find_Pwd/false');
            }
        })
    }catch(err){
        console.log("Pwd찾기 오류")
        console.log(err.message);
    }
}


module.exports = {CheckLogin,CheckEmail,AddId,FindID,FindPwd}