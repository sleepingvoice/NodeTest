const express = require('express');
const divide = require('./messageDivide');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const sqlConnect = require('./sqlConnect');

const app = express();
const port = 5000;

app.set("port",process.env.PORT || 5000);

app.get('/', (req, res)=>
{
    res.send(`<h2>welcome to server</h2>`);
});

app.listen(port, ()=>
{
   console.log(`SERVER 실행됨 ${port}`);
});

app.post('/imgfile',upload.single('image') ,(req,res) =>
{
    if (!req.file) {
        console.log("Image File Not Found");
        return;
    }

    const image = req.file;
    const imagePath = image.path;

    const insertQuery = 'INSERT INTO imgtable (img) VALUES' + '(\'' + imagePath + '\')';

    sqlConnect.MessageQuery(insertQuery,(result) =>
    {
        console.log('Add ImageFile');
        res.send(result.insertId.toString());
    })
})

app.get('/getImage/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const insertQuery = `SELECT * FROM imgtable WHERE imgId = ${imageId}`;
    
    sqlConnect.MessageQuery(insertQuery,(result) =>
    {
        if (result.length === 0) {
            console.log(insertQuery);
            console.log("Image File Not Found");
            return;
        }

        var path = result[0].img;
        path = path.replace('uploads','uploads/');
        
        console.log("Image File Send");
        
        res.sendFile(path, { root: __dirname });
    })

});

//웹소켓
const wsServer = require('ws').Server;
var wss = new wsServer({ port: 4000});

wss.on('connection', function connection(client)
{
    console.log('Client connected');
    client.on('message', function mss(message){
        divide.Divide(message.toString(),(result) => 
        {
            client.send(result);
        })
    });

    client.send("ServerConnection");
});


