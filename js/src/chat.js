module.exports = chat;

//var events = require('events'),
//    util = require('util');



function chat () {
    'use strict';
    var socket;
    var username = "";

    this.init = function (controls) {
    };

    this.connect = function(io){
        /**
         * Created by ozkey_000 on 3/09/14.
         */

        socket = io.connect('http://localhost:8080');

        // on connection to server, ask for user's name with an anonymous callback
        socket.on('connect', function () {
            // call the server-side function 'adduser' and send one parameter (value of prompt)
            var id = Math.floor((Math.random() * 1000) + 1);
            username = "u"+id;
            socket.emit('adduser', username);
        });

        // listener, whenever the server emits 'updatedata', this updates the chat body
        socket.on('updatedata', function (username, data) {
            $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
        });

        // listener, whenever the server emits 'updateusers', this updates the username list
        socket.on('updateusers', function (data) {
            $('#users').empty();
            $.each(data, function (key, value) {
                $('#users').append('<div>' + key + '</div>');
            });
        });

        socket.on('gameBoardData', function (data) {
            gameBoardClient.updateGameBoard(data);
        });

        // when the client clicks SEND
        $('#datasend').click(function () {
            var message = $('#data').val();
            $('#data').val('');
            // tell server to execute 'sendchat' and send along one parameter
            socket.emit('sendchat', message);
        });

        $(document).keydown (function(e) {
            // when the client hits ENTER on their keyboard
            $('#data').keypress(function (e) {
                if (e.which == 13) {
                    $(this).blur();
                    $('#datasend').focus().click();
                }
            });
        });
    }
}



