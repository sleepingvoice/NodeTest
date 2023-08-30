const { json } = require('express');
const sqlConnect = require('../sqlConnect');

let res_let = 
{
    users : [] 
};

const GetMap = (callback) =>
{
    sqlConnect.MessageQuery( 'select * from usermapinfo',(rows) =>
    {
        var result = '';
        result = JSON.stringify(rows);

        console.log('MoveList보냄');
        
        callback('Get_MapList/' + result);
    });
};

const AddMap = (callback, data) =>
{
    var datajson = JSON.parse(data);
    
    var querystr = 'insert into usermapinfo(userId,codinate,movelist,enemyInfo) values (' + datajson.userId + '," '
                    + datajson.codinate + '","' + datajson.movelist + '","' + datajson.enemyInfo + '");'

    sqlConnect.MessageQuery(querystr,() =>
    {
        console.log('AddMap');
        callback('AddMapSuccess');
    });
};

module.exports = {GetMap,AddMap}