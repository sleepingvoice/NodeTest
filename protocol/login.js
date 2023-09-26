const sqlConnect = require('../sqlConnect');
const security = require('./security');
const dayjs = require("dayjs");

var securityKey = "Gu";

const AddGuestId = (callback,NickName) =>
{
    var nowTime = new dayjs();
    var TokenValue = nowTime.format();
    console.log(TokenValue);
    var EncryptText = security.Encrypt(TokenValue,securityKey,128);
    
    sqlConnect.MessageQuery('insert into useraccount(nickName,userToken) values ("' + NickName + '","' + EncryptText + '");',(row) =>
    {
        console.log('id 추가');
        callback('Add_ID/Success');
    });
};

const AddUserId = (callback,NickName,GoogleToken) =>
{
    var EncryptText = security.Encrypt(GoogleToken,securityKey,128);
    
    sqlConnect.MessageQuery('insert into useraccount(nickName,userToken) values ("' + NickName + '","' + EncryptText + '");',(row) =>
    {
        console.log('id 추가');
        callback('Add_ID/Success');
    });
};


const CheckLogin = (callback, GoogleToken) =>
{
    var EncryptText = security.Encrypt(GoogleToken,securityKey,128);
    console.log("로그인 체크 받음");
    sqlConnect.MessageQuery('select userid from useraccount where userToken = "' + EncryptText +'";',(rows) =>
    {
        var result = "false";
        var resultid = [];
        if(rows.length > 0)
        {
            rows.forEach((values) => resultid.push(values.nickName + ":" + values.userid))

            result = resultid;
        }

        console.log("로그인 체크 : " + result);

        callback('Check_Login/' +result);
    });
};



module.exports = {AddGuestId,AddUserId,CheckLogin}