const express = require('express');
const http= require('http');
const socketIO= require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname+'/../public'));

io.on('connection',(socket)=>{
    console.log('someone is connected');

    socket.on('join',(data)=>{
        console.log(data);

        socket.join("room-"+data.room);

        socket.broadcast.to("room-"+data.room).emit('userJoined',
        `${data.user} joined the room`);

        
    });

    // socket.on('sendMess',(newMessage,cb)=>{
    //     console.log(newMessage);

    //     socket.broadcast.emit('newMessage',{
    //         from:"anita",
    //         message:"Iam message"
    //     },()=>{
    //         console.log('message received');
            
    //     });

    //     cb('ok')
        
    // })

    socket.on('disconnect',()=>{
        console.log('user disconnected formserver');
    })
    
})

const port =process.env.PORT ||3000;
server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    
})