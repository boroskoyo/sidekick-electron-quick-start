const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const { onTrigger } = require('@runsidekick/sidekick-client')
const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:5173'
    }
}) //in case server and client run on different urls
io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)
  
  socket.join('stack-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
})

function ingestFunc (index) {
  return async function (data) {
      io.to('stack-room').emit('stack', data)
  }
}

function ingestFuncLog (index) {
  return async function (data) {
      console.log(JSON.stringify({index,data}));
  }
}

const clientInfo = {
  sidekick_email : '', 
  sidekick_password : '', 
  tracepointFunction : ingestFunc('trace'),
  logpointFunction : ingestFuncLog('log')
}

onTrigger(clientInfo);

server.listen(PORT, err=> {
  if(err) console.log(err)
  console.log('Server running on Port ', PORT)
})