chats = [];
users = [];
isTyping = {};
var server = require('./../server/controllers/server.js');

module.exports = function Routes(app, io){
  io.sockets.on("connection", function(socket){
    socket.on("new_user", function(user){
        users.push(user);
        console.log("Got new user", user);
        socket.user = user;
        isTyping[user.name] = false;
        io.emit("chats", chats);
        io.emit("users", users);
    });
    socket.on("typing", function(user){
       //console.log("User is typing", isTyping[user.name]);

       if(!isTyping[user.name]){
          console.log(user.name + " is typing");
          io.emit("typing", user);
          isTyping[user.name] = true;
       }
    });
    socket.on("message", function(message){
       //console.log("Message received", message);
       isTyping[message.user.name] = false;
       io.emit("not_typing", message.user.name);
       chats.push(message);
       socket.broadcast.emit("new_message", message);
    });
    socket.on("disconnect", function(){
       if(socket.user !== undefined){
         console.log(socket.user.name +" just disconnected.");
         io.emit("disconnect", socket.user.name +" just disconnected.");
         delete isTyping[socket.user.name]
         var i = users.indexOf(socket.user);
         users.splice(i, 1);
         io.emit("users", users);
       }
    })
        
  });
}