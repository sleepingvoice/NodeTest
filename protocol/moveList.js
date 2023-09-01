const sqlConnect = require('../sqlConnect');

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
    
    var querystr = 'insert into usermapinfo(userId,codinate,movelist,enemyInfo,mapName,mapImg) values (' + datajson.userId + '," '
                    + datajson.codinate + '","' + datajson.movelist + '","' + datajson.enemyInfo + '","' + datajson.mapName + '","' + datajson.mapImg + '");'

    sqlConnect.MessageQuery(querystr,() =>
    {
        console.log('AddMap');
        callback('AddMapSuccess');
    });
};

module.exports = {GetMap,AddMap}