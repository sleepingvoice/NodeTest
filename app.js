//인터넷 페이지

const express = require('express');
const moveList = require('./moveList');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>
{
    res.send(`<h2>welcome to server</h2>`);
});

app.listen(port, ()=>
{
   console.log(`SERVER 실행됨 ${port}`);
});

//웹소켓
const wsServer = require('ws').Server;
var wss = new wsServer({ port: 4000});



wss.on('connection', function connection(client)
{
    console.log('Client connected');
    client.on('message', function mss(message){
        console.log('client: %s', message);
        moveList.Getdata((result) => 
        {
            client.send(result);
        })
    });

    client.send("ServerConnection");
});
