const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const { onTrigger, SidekickApi } = require("@runsidekick/sidekick-client");
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
}); //in case server and client run on different urls
io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.join("stack-room");

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

function ingestFunc(index) {
  return async function (data) {
    console.log(data);
    io.to("stack-room").emit("stack", data);
  };
}

function ingestFuncLog(index) {
  return async function (data) {
    console.log(JSON.stringify({ index, data }));
  };
}

function params(lineNo) {
  return {
    applicationFilters: [
      {
        name: "employee-system",
        version: "1.0.0",
        stage: "prod",
      },
    ],
    fileName:
      "https://api.github.com/repos/boroskoyo/sidekick-example-employee-management-system/contents/server/index.js?ref=ab19f2f01677e6db5f3742cb595161be95ebf3b3",
    lineNo,
    expireSecs: 180,
    expireCount: -1,
    enableTracing: false,
    persist: true,
  };
}
const apiInfo = {
  apiKey: "my-token",
  authToken: "my-token",
};

const clientInfo = {
  sidekick_host: "ws://127.0.0.1",
  sidekick_port: "7777",
  sidekick_token: "my-token",
  tracepointFunction: ingestFunc("trace"),
  logpointFunction: ingestFuncLog("log"),
};

onTrigger(clientInfo);

const apiClient = new SidekickApi(apiInfo, "http://localhost:8084");

app.post("/tracepoint/:id", (req, res) => {
  apiClient.putTracepoints(params(req.params.id));
  res.send("tracepoint added to line " + req.params.id);
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
