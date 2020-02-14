const express = require("express");

const actions = require("./actionHub/actions.js");
const projects = require("./projectHub/projects.js");

const server = express();

server.use(express.json());

server.use("/api/projects", projects);

server.use("/api/actions", actions);

module.exports = server;
