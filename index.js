
const server = require("./server.js");

const port = process.env.port || 4000

server.listen(port,() => console.log(`Server running on port ${port}`))