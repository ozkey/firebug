module.exports = chat;

function chat (io) {
    'use strict';

    console.log("chat");
    var $this = this;
    var usersComData = {};

    //public methods
    this.removeUser = function(username) {
        delete usersComData[username];
    };

    this.chatEventManager = function () {
        io.sockets.on('connection', function (socket) {

            // when the client emits 'sendchat', this listens and executes
            socket.on('sendchat', function (data) {
                // we tell the client to execute 'updatedata' with 2 parameters
                io.sockets.emit('updatedata', socket.username, data);
            });


            // when the client emits 'adduser', this listens and executes
            socket.on('adduser', function (username) {
                // we store the username in the socket session for this client
                socket.username = username;
                // add the client's username to the global list
                usersComData[username] = username;
                // echo to client they've connected
                socket.emit('updatedata', 'SERVER', 'you have connected');
                // echo globally (all clients) that a person has connected
                //socket.broadcast.emit will send the message to all the other clients except the newly created connection
                socket.broadcast.emit('updatedata', 'SERVER', username + ' has connected');
                // update the list of users in chat, client-side
                //io.sockets.emit will send to all the clients
                io.sockets.emit('updateusers', usersComData);


            });

            // when the user disconnects.. perform this
            socket.on('disconnect', function () {
                // remove the username from global usersComData list
                var username = socket.username;
                $this.removeUser(username);
                // update list of users in chat, client-side
                io.sockets.emit('updateusers', usersComData);
                // echo globally that this client has left
                socket.broadcast.emit('updatedata', 'SERVER', username + ' has disconnected');
            });
        });
    };

}



