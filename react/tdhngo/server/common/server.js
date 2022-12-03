import express from "express";
import Mongoose from "mongoose";
import Config from "config";
import * as http from "http";
import * as path from "path";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import basicAuth from 'express-basic-auth';
import WebSocket from 'websocket';
import userModel from "../models/user";
import apiErrorHandler from '../helper/apiErrorHandler';
import cron from '../api/v1/controllers/cron/cron';

//*******************************ends block of cron********************************/
const app = new express();
var server = http.createServer(app);



import socket from 'socket.io';
const io = socket(server);
const root = path.normalize(`${__dirname}/../..`);

const WebSocketServer = WebSocket.server;
const WebSocketClient = WebSocket.client;
const client = new WebSocketClient();
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
  maxReceivedFrameSize: 64 * 1024 * 1024,   // 64MiB
  maxReceivedMessageSize: 64 * 1024 * 1024, // 64MiB
  fragmentOutgoingMessages: false,
  keepalive: false,
  disableNagleAlgorithm: false
});

class ExpressServer {
  constructor() {
    app.use(express.json({ limit: '1000mb' }));

    app.use(express.urlencoded({ extended: true, limit: '1000mb' }));

    app.use(morgan('dev'));

    app.use(
      cors({
        allowedHeaders: ["Content-Type", "token", "authorization"],
        exposedHeaders: ["token", "authorization"],
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
      })
    );
  }
  router(routes) {
    routes(app);
    return this;
  }



  configureSwagger(swaggerDefinition) {
    const options = {
      swaggerDefinition,
      apis: [
        path.resolve(`${root}/server/api/v1/controllers/**/*.js`),
        path.resolve(`${root}/api.yaml`),
      ],
    };

    app.use(
      "/api-docs",
      // basicAuth({
      //   users: { "no-aashutosh": "Mobiloitte1" },
      //   challenge: true,
      // }),
      swaggerUi.serve,
      swaggerUi.setup(swaggerJSDoc(options))
    );
    return this;
  }

  handleError() {
    app.use(apiErrorHandler);

    return this;
  }

  configureDb(dbUrl) {
    return new Promise((resolve, reject) => {
      Mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err) => {
        if (err) {
          console.log(`Error in mongodb connection ${err.message}`);
          return reject(err);
        }
        console.log("Mongodb connection established");
        return resolve(this);
      });
    });
  }

  // })


 

  listen(port) {
    server.listen(port, () => {
      console.log(`secure app is listening @port ${port}`, new Date().toLocaleString());
    });
    return app;
  }
}


//*********** socket io************** */
//************ connection ********************** */
var userCount = 0,
  users = {},
  keys = {},
  sockets = {},
  onlineUsers = [];
io.sockets.on("connection", (socket) => {
  userCount++;
  console.log("my socket id is >>>>>", socket.id, userCount);

  //**********************online user event call**************/
  socket.on("onlineUser", async (data) => {
    let allOnlineUser = await OnlineUser(data, socket.id);
    console.log("send====>", onlineUsers, allOnlineUser);
    // io.sockets.in(socket.id).emit("onlineUser", JSON.stringify(onlineUsers))
    io.sockets.emit("onlineUser", onlineUsers);
  });

  //************* send Chat one to one ****************** */
  socket.on("oneToOneChat", async (data) => {
    try {
      // console.log("line no 75 server====>>", data);
      let chatSend = await chatController.oneToOneChat(data);
      // console.log("I am here to send CHAT >>>>>", chatSend);
      var socketUser = [data.senderId, data.receiverId];
      // console.log("socket users>?>", socketUser);
      let sendingRequest = false,
        chatHistory = [];
      chatHistory = chatSend.chatHistory ? chatSend.chatHistory : [];
      // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",chatHistory)
      onlineUsers.map((e) => {
        if (socketUser.includes(e.userId)) {
          sendingRequest = true;
          console.log("socketId=====>>>>>>>>", e.socketId);
          // chatHistory = true;

          if (chatSend.response_code == 200) {
            chatSend.chatHistory =
              e.userId == data.receiverId ? chatHistory : [];
          }
          io.sockets.in(e.socketId).emit("oneToOneChat", chatSend);
        }
      });
      if (sendingRequest == false || onlineUsers.length == 0) {
        // console.log("Line no 89=====???>>>", chatSend);
        io.sockets.in(socket.id).emit("oneToOneChat", chatSend);
      }
    } catch (error) {
      // throw error;
      console.log("In OneToOneChat===>>>", error);
    }
  });

  //...............................................chat History..............................................//

  socket.on("chatHistory", async (data) => {
    try {
      let chatData = await chatController.ChattingHistory(data);
      console.log("server chat >>>>>>>>>", chatData);
      io.sockets.in(socket.id).emit("chatHistory", chatData);
      // io.sockets.emit('chatHistory', chatData)
    } catch (error) {
      console.log("In ChatHistory===>>>", error);
    }
  });

  // //...............................................clear chat..............................................//

  socket.on("clearChat", async (data) => {
    try {
      let chatData = await chatController.clearChat(data);
      io.sockets.in(socket.id).emit("clearChat", chatData);
    } catch (error) {
      console.log("In clearChat===>>>", error);
    }
  });

  //...............................................viewChat History.........//

  socket.on("viewChat", async (data) => {
    try {
      let chatData = await chatController.viewChat(data);
      console.log("server chat >>>>>>>>>", chatData);
      io.sockets.in(socket.id).emit("viewChat", chatData);
    } catch (error) {
      console.log("In viewChat===>>>", error);
    }
    // io.sockets.emit('viewChat', chatData)
  });



  //*****************************disconnect ****************//

  socket.on("disconnect", async () => {
    userCount--;
    console.log("disconnected socketId", userCount, socket.id);
    // console.log("in disconnected >>>>>", +JSON.stringify(keys ))

    console.log(
      "in disconnected online user>>>> >>>>>",
      +JSON.stringify(onlineUsers)
    );

    userCount--;
    console.log("disconnected socketId", userCount, socket.id);
    // console.log("in disconnected >>>>>", +JSON.stringify(keys ))
    console.log(
      "in disconnected available online user>>>> >>>>>",
      +JSON.stringify(onlineUsers)
    );
    if (onlineUsers.length > 0) {
      let data = onlineUsers.map((e, index2) => {
        if (e.socketId == socket.id) {
          console.log(
            "remove ejabbered with socket id>>>>>",
            e.socketId,
            socket.id
          );
          delete onlineUsers[index2];
          return;
        }
      });

      console.log("246", data)
    }

    onlineUsers = onlineUsers.filter(Boolean);
    console.log(
      "After remove socket Id , available online user ===>",
      JSON.stringify(onlineUsers)
    );
  });

  //************************ online user************** */

  function OnlineUser(data, socketId) {
    return new Promise(async (resolve, reject) => {
      try {
        var userResult = await userModel.findOne({ _id: data.userId });  ///..................
        if (onlineUsers.length > 0) {
          let check = onlineUsers.findIndex((x) => x.userId === data.userId);
          console.log("check=====264====", check);
          if (check >= 0) {
            console.log("previous record", onlineUsers[check]);
            data.status = "ONLINE";
            data.socketId = socketId;
            data.name = userResult.name,   ///////////////....................
              data.profilePic = userResult.profilePic, ///////////...................
              onlineUsers[check] = data;
          } else {
            console.log("new record", check, data);
            data.status = "ONLINE";
            data.socketId = socketId;
            data.name = userResult.name;                                     //........
            data.profilePic = userResult.profilePic;                        //.........
            onlineUsers.push(data);
            console.log("after insert record", onlineUsers);
          }
          resolve();
        } else {
          var userResult = await userModel.findOne({ _id: data.userId });
          let newUser = {
            userId: data.userId,
            status: "ONLINE",
            socketId: socketId,
            name: userResult.name,                                            //.........................
            profilePic: userResult.profilePic,                                //........................
          };
          console.log("data", data);
          console.log(" new userId===>", data, newUser);
          onlineUsers.push(newUser);

          resolve();
        }
      } catch (error) {
        console.log("Line no 290===>>", error)
        throw error;
      }
    });
  }
});



wsServer.on('request', function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  const connection = request.accept('', request.origin);
  connection.on('message', function (message) {
    var type = JSON.parse(message.utf8Data);
    console.log("type===>>", type)
    if (type.token) {
      connection.sendUTF(getNotificationList(type.token));
    }

    if (type.user_token) {
      connection.sendUTF(messageReceiveUserCount(type.user_token));
    }

    if (type.type === "ChatHistory") {
      connection.sendUTF(chatHistory(type));
    }


  });

  async function getNotificationList(token) {
    if (connection.connected) {
      let result = await notificationController.getNotificationList(token);
      if (result) {
        var data = JSON.stringify(result.responseResult);
        connection.sendUTF(data);
      }
      setTimeout(() => {
        getNotificationList(token)
      }, 5000);
    }
  }

  async function messageReceiveUserCount(token) {
    if (connection.connected) {
      let result = await chatController.messageReceiveUserCount(token);
      if (result) {
        var data = JSON.stringify(result.responseResult);
        connection.sendUTF(data);
      }
      setTimeout(() => {
        messageReceiveUserCount(token)
      }, 3000);
    }
  }

  async function chatHistory(requestData) {
    if (connection.connected) {
      let result = await chatController.chatHistoryWebSocket(requestData);
      if (result) {
        var data = JSON.stringify(result);
        connection.sendUTF(data);
      }
      setTimeout(() => {
        chatHistory(requestData)
      }, 3000);
    }
  }


  //******************************************************************************************/
  connection.on('close', function (reasonCode, description) {
    console.log(new Date() + ' Peer ' + connection.remoteAddress + ' Client has disconnected.');
  });
  connection.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
  });
});

client.on('connect', function (connection) {
  console.log(new Date() + ' WebSocket Client Connected');
  connection.on('error', function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on('close', function () {
    console.log('echo-protocol Connection Closed');
  });

});

// client.connect('ws://182.72.203.245:1905/', '');
client.connect('ws://localhost:1905/', '');



export default ExpressServer;

function originIsAllowed(origin) {
  return true;
}

