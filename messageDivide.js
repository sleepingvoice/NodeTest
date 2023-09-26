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
        case 'Check_Login' :
            checkLogin.CheckLogin(callback,mss[1]);
            break;
        case 'Add_GuestID' :
            checkLogin.AddGuestId(callback,mss[1]);  
            break;
        case 'Add_UserID' :
            checkLogin.AddUserId(callback,mss[1],mss[2]);  
            break;      
    }
}