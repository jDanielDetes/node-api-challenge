const express = require("express");

const actions = require("./actionHub/actions.js");


const server = express();

server.use(express.json());



server.use("/api/actions", actions);

module.exports = server;
