//인터넷 페이지

const express = require('express');
const divide = require('./messageDivide');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const sqlConnect = require('./sqlConnect');

const app = express();
const port = 5000;

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
        res.status(400).send('No file uploaded.');
        return;
    }

    const image = req.file;
    const imagePath = image.path;

    const insertQuery = 'INSERT INTO imgtable (img) VALUES' + '(\'' + imagePath + '\')';

    sqlConnect.MessageQuery(insertQuery,(result) =>
    {
        console.log('MySQL에 이미지 정보 저장됨');
        res.send(result.insertId.toString());
    })
})

app.get('/getImage/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const insertQuery = `SELECT * FROM imgtable WHERE imgId = ${imageId}`;
    console.log(insertQuery);
    sqlConnect.MessageQuery(insertQuery,(result) =>
    {
        if (result.length === 0) {
            res.status(404).send('Image not found.'); // 해당 ID에 대한 이미지를 찾지 못한 경우
            return;
        }

        var path = result[0].img;
        path = path.replace('uploads','uploads/');
        console.log(path);
        // 이미지 파일을 응답으로 보냅니다.
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


