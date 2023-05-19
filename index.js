const express=require('express')
const routes=require('./routes/routes')
const connectdb=require('./config/database')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const http=require('http');
const {Server}=require('socket.io')
const {connectcloudinary}=require('./utils/file')
const fileupload=require('express-fileupload');
require('dotenv').config();
const app=express();
const PORT=process.env.PORT || 8000
app.use(cookieparser());
app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(cors());
app.use("/api/v1",routes);
// app.listen(PORT,()=>{
//     console.log(`Server started on port number ${PORT}`);
// })
// app.get("/",(req,res)=>{
//     res.send("Server ready he bhai")
// })
const server=http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:"https://main--shaktichatapp.netlify.app/",
        credentials:true
    }
})

io.on("connection",(socket)=>{
    // console.log(`User connected: ${socket.id}`);
       
    socket.on("join_room",(data)=>{
        if(data!==null){
        socket.join(data);
        // console.log(`${socket.id} joined room number ${data}`);
        }
    })
    socket.on("leave_room",(data)=>{
        if(data!==null){
          socket.leave(data)
        //   console.log(`${socket.id} leave room number ${data}`);
        }
    })
    socket.on("send_message",(data)=>{
        // console.log(message sent to data.room);
        // socket.broadcast.emit("receive_message",data)
        socket.to(data.room).emit("receive_message",data)
    })

   
})

server.listen(PORT,()=>{
    console.log(`Server started on port number ${PORT}`);
})


connectdb();
connectcloudinary();