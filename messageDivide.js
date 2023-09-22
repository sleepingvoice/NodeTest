const moveList = require('./protocol/moveList');
const checkLogin = require('./protocol/login');

exports.Divide = (message,callback) =>
{
    var mss = message.split('/');
    
    switch(mss[0])
    {
        case 'Get_MapList' :
            moveList.GetMap(callback);
            break;
        case 'Add_Map' :
            moveList.AddMap(callback,mss[1]);
            break;
        case 'Check_Email' :
            checkLogin.CheckEmail(callback,mss[1]);
            break;
        case 'Check_Login' :
            checkLogin.CheckLogin(callback,mss[1],mss[2]);
            break;
        case 'Add_ID' :
            checkLogin.AddId(callback,mss[1],mss[2],mss[3]);  
            break;      
        case 'Find_ID' :
            checkLogin.FindID(callback,mss[1]);
        case 'Find_Pwd':
             checkLogin.FindPwd(callback,mss[1],mss[2]);
    }
}