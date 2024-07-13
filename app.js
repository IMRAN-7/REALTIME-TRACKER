const express=require("express");   // importing express framework used to create a web server
const app=express();                // creating an instance functionality transferred 

const path=require("path");

const http=require("http");          //import a built in  http module to create an http server  

const socketio=require("socket.io");   //socket.io library for realtime web communication

const server=http.createServer(app);   //creating an http server using express app


const io=socketio(server);                // intializing new instance of socket.io by passing http server to it
 

//setting ejs
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));

//handling request
io.on("connection",function(socket){
    socket.on("send-location",function(data){
    io.emit("receive-location",{id:socket.id,...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    });
});



app.get("/", function(req,res){                 //creating a route
    res.render("index");
});

server.listen(3000);