const sqlConnect = require('../sqlConnect');

const GetMap = (callback) =>
{
    sqlConnect.MessageQuery( 'select * from usermapinfo',(rows) =>
    {
        var result = '';
        result = JSON.stringify(rows);

        console.log('Send MapInfo');
        
        callback('Get_MapList/' + result);
    });
};

const AddMap = (callback, data) =>
{
    var datajson = JSON.parse(data);

    console.log(datajson);
    var querystr = `INSERT INTO usermapinfo (userId, codinate, movelist, enemyInfo, mapName, mapImg) VALUES 
    ('${datajson.userId}', '${datajson.codinate}', '${datajson.movelist}', '${datajson.enemyInfo}', '${datajson.mapName}', '${datajson.mapImg}')`;

    sqlConnect.MessageQuery(querystr,() =>
    {
        console.log('Add MapInfo');
        callback('Add_Map/Success');
    });
};


module.exports = {GetMap,AddMap}