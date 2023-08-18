//인터넷 페이지

const express = require('express');
const usersRouter = require('./usersRouter');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/users`, usersRouter);

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

//https://jdh5202.tistory.com/886 참고사이트
wss.on('connection', function connection(client)
{
    console.log('Client connected');

    client.send("ServerConnection");
});

//클라이언트로부터의 메세지 처리
wss.on('message',(msg) => 
{

})

// 연결 종료 처리
wss.on('close',() => 
{

})