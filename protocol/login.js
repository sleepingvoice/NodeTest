const sqlConnect = require('../sqlConnect');
const security = require('./security');
const dayjs = require("dayjs");

var securityKey = "Gu";

const AddGuestId = (callback,NickName) =>
{
    var nowTime = new dayjs();
    var TokenValue = nowTime.format();
    console.log(TokenValue);
    var EncryptText = security.Encrypt(TokenValue,securityKey);
    
    sqlConnect.MessageQuery('insert into useraccount(nickName,userToken) values ("' + NickName + '","' + EncryptText + '");',(row) =>
    {
        console.log('id 추가');
        callback('Add_ID/' + TokenValue);
    });
};

const AddUserId = (callback,NickName,GoogleToken) =>
{
    var EncryptText = security.Encrypt(GoogleToken,securityKey);
    console.log("id 추가" + EncryptText);
    sqlConnect.MessageQuery('insert into useraccount(nickName,userToken) values ("' + NickName + '","' + EncryptText + '");',(row) =>
    {
        console.log('id 추가');
        callback('Add_ID/' + GoogleToken);
    });
};


const CheckLogin = (callback, GoogleToken) =>
{
    console.log("로그인 체크 받음");

    var TockenValue;
    sqlConnect.MessageQuery('select userToken from useraccount',(rows) =>
    {
        if(rows.length >0)
        {
            rows.forEach((values) =>  
            {
                if(values.userToken == GoogleToken)
                {
                    console.log("있음");
                    TockenValue = values.userToken;
                }
            })
        }

        sqlConnect.MessageQuery('select * from useraccount where userToken = "' + TockenValue +'";',(rows) =>
        {
            var result = "false";
            if(rows.length > 0)
            {
                rows.forEach((values) => 
                {
                    result = "";
                    result += values.nickName + ":" + values.userid;
                })
            }
    
            console.log("로그인 체크 : " + result);
    
            callback('Check_Login/' +result);
        });
    })


};



module.exports = {AddGuestId,AddUserId,CheckLogin}