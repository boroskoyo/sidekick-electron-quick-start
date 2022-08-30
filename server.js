const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const { onTrigger, SidekickApi } = require('@runsidekick/sidekick-client')
const io = socketIo(server, {
  cors: {
    origin: '*'
  }
}) //in case server and client run on different urls
io.on('connection', (socket) => {
  console.log('client connected: ', socket.id)

  socket.join('stack-room')

  socket.on('disconnect', (reason) => {
    console.log(reason)
  })
})

function ingestFunc(index) {
  return async function (data) {
    console.log(data)
    io.to('stack-room').emit('stack', data)
  }
}


function ingestFuncLog(index) {
  return async function (data) {
    console.log(JSON.stringify({ index, data }));
  }
}

const clientInfo = {
  sidekick_host: "ws://127.0.0.1",
  sidekick_port: "7777",
  sidekick_token: "my-token",
  tracepointFunction: ingestFunc('trace'),
  logpointFunction: ingestFuncLog('log')
}

function params(lineNo) {
  return {
    applicationFilters: [
      {
        name: 'sidekick-test',
        version: "1.0.0",
        stage: "stage"
      }
    ],
    fileName: "https://api.github.com/repos/boroskoyo/sidekick_hapi_example/contents/index.js?ref=2b58f09bbe509b007df4babf005d6dd007e93755",
    lineNo,
    expireSecs: 180,
    expireCount: -1,
    enableTracing: false,
    persist: true
  }
}
const apiInfo = {
  apiKey: 'my-token',
  authToken: 'my-token',
}

onTrigger(clientInfo);
const apiClient = new SidekickApi(apiInfo, 'http://localhost:8084');

app.post('/tracepoint/:id', (req, res) => {
  apiClient.putTracepoints(params(req.params.id));
  res.send('tracepoint added to line '+req.params.id)
})


server.listen(PORT, err => {
  if (err) console.log(err)
  console.log('Server running on Port ', PORT)
})