const sqlConnect = require('../sqlConnect');

const CheckEmail = (callback, email) =>
{
    var mss = email.split('@');

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
};

const AddId = (callback,id,pwd,email) =>
{
    console.log(email);
    var mss = email.split('@');

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
};


const CheckLogin = (callback, id, pwd) =>
{
    sqlConnect.MessageQuery('select userid from useraccount where Id = "' + id +'" and pwd = "' + pwd + '";',(rows) =>
    {
        var result = "false";
        var resultid = [];
        if(rows.length > 0)
        {
            rows.forEach((values) => resultid.push(values.userid))

            result = id + ":" + resultid;
        }

        console.log("로그인 체크 : " + result);

        callback('Check_Login/' +result);
    });
};

const FindID = (callback,email) =>
{
    var mss = email.split('@');
    sqlConnect.MessageQuery('select * from checkaccount where email like "' + mss[0] + '\@' + mss[1] +'";', (rows)=>
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
    });
}

const FindPwd = (callback,id,email) =>
{
    var mss = email.split('@');
    sqlConnect.MessageQuery('select * from checkaccount where email like "' + mss[0] + '\@' + mss[1] +'";', (rows)=>
    {
        var result = [];
        if(rows.length > 0)
        {
            rows.forEach((user)=>
            {
                sqlConnect.MessageQuery('select * from useraccount where userid = ' + user.userid + ' and Id = "' + id + '" ;',(rows) =>
                {
                    rows.forEach((values) => result.push(values.pwd))
                        
                    console.log("Find Pwd / Success");

                    callback('Find_Pwd/' + result);
                });
            });
        }
        else
        {
            callback('Find_Pwd / failure');
        }
    });
}


module.exports = {CheckLogin,CheckEmail,AddId,FindID,FindPwd}