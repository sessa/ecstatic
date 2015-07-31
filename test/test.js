/*jslint node: true */
/*global describe: false, before: false, after: false, it: false */

/************************
Writing and Running Tests:
To run the test suit, use the command “grunt test” when in the squad_app/test folder.
These tests will be run, and any that you write in the "describe" block. 
We are using Grunt with the Mocha. For package details, see Gruntfile.js. 
*************************/


"use strict";

// Declare the variables used
var expect = require('chai').expect,
    assert = require('chai').assert,
    request = require('request'),
    server = require('../index'),
    redis = require('redis'),
    io = require('socket.io-client'),
    client;
client = redis.createClient();

var socket = io.connect('http://localhost:8080', {
    'reconnection delay' : 0,
    'reopen delay' : 0,
    'force new connection' : true
}); 
var socket1 = io.connect('http://localhost:8080', {
    'reconnection delay' : 0,
    'reopen delay' : 0,
    'force new connection' : true
}); 

var global_room_id = "";
describe('ROOMS API', function () {

    describe('create_room', function () {
        it("should create a room for one person", function (done) {
            socket.emit('create_room', {room_name: "testy_room"});
            socket.on('create_room', function (data) {
                done();
            });
        });
    }); 

    describe('rooms', function () {
        it("should get one room", function (done) {
            socket.emit('rooms');
            socket.on('rooms', function (data) {
                //set global room variable
                global_room_id = data[0].room_id;
                done();
            });
        });
    });

    describe('join_room', function () {
        it("should put two users in one room", function (done) {
            socket1.emit('join_room', {"room_id":global_room_id});
            socket1.on('join_room', function (data) {
                done();
            });
            //also returns "return_join_room" with a chatlog
        });
    });

    describe('get_list_of_users', function () {
        it("should get two users in one room", function (done) {
            socket.emit('users', {"room_id":global_room_id});
            socket.on('users', function (data) {
                expect(Object.keys(data).length).to.equal(2);
                done();
            });
        });
    });

    describe('add_songs', function () {
        it("should add a song to the playlist", function (done) {
            var returned_twice = false;
            socket1.emit('add_song', JSON.stringify({artwork_url:"https:test1", stream_url:"https:test1", song_name:'snow', artist:'Red Hot Chili Peppers'}));
            socket1.on("add_song", function (data) {
                done();
            });
        });
    });

    describe('leave_room', function () {
        it("should remove one user from room", function (done) {
            socket1.emit('leave_room');
            socket1.on('leave_room', function (data) {
                done();
            });
        });
    });

    describe('disconnect', function () {
        it("acknoweledge disconnect", function (done) {
            socket.disconnect();
            done();
        });
    });

    // Afterwards, stop the server and empty the database
    after(function (done) {
        console.log('Stopping the server');
        client.flushdb();
        done();
    });

});

