
const express = require('express')

const server= express()

server.get('/',(req,res)=>{
    res.send(`<h1>start<h2>`)
})

const port = process.env.port || 4000

server.listen(port,() => console.log(`Server running on port ${port}`))