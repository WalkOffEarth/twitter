// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const request = require("request");
// // const socketIo = require("socket.io");
// // const http = require("http");

// // const app = express();
// // let port = 3003;

// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // const server = http.createServer(app);
// // const io = socketIo(server, {
// //   cors: {
// //     origin: "http://localhost:3000",
// //   },
// // });

// // const BEARER_TOKEN =
// //   "AAAAAAAAAAAAAAAAAAAAAKqGGAEAAAAAjF0QjBeWZBQiFVV1woQSptPNN9I%3D6KWCGUe5wVTdT5aHwrALj00V0N8alIgKMsciUAUVWZWCMh85Tm";

// // let timeout = 0;

// // const streamURL = new URL(
// //   "https://api.twitter.com/2/tweets/sample/stream?expansions=author_id"
// // );

// // const errorMessage = {
// //   title: "Please Wait",
// //   detail: "Waiting for new Tweets to be posted...",
// // };

// // const authMessage = {
// //   title: "Could not authenticate",
// //   details: [
// //     `Please make sure your bearer token is correct.
// //       If using Glitch, remix this app and add it to the .env file`,
// //   ],
// //   type: "https://developer.twitter.com/en/docs/authentication",
// // };

// // const sleep = async (delay) => {
// //   return new Promise((resolve) => setTimeout(() => resolve(true), delay));
// // };

// // const streamTweets = (socket, token) => {
// //   const config = {
// //     url: streamURL,
// //     auth: {
// //       bearer: token,
// //     },
// //     timeout: 31000,
// //   };

// //   try {
// //     const stream = request.get(config);
// //     stream
// //       .on("data", (data) => {
// //         try {
// //           const json = JSON.parse(data);
// //           if (json.connection_issue) {
// //             socket.emit("error", json);
// //             reconnect(stream, socket, token);
// //           } else {
// //             if (json.data) {
// //               socket.emit("tweet", json);
// //             } else {
// //               socket.emit("authError", json);
// //             }
// //           }
// //         } catch (e) {
// //           socket.emit("heartbeat");
// //         }
// //       })
// //       .on("error", (error) => {
// //         socket.emit("error", errorMessage);
// //         reconnect(stream, socket, token);
// //       });
// //   } catch (e) {
// //     socket.emit("authError", authMessage);
// //   }
// // };

// // const reconnect = async (stream, socket, token) => {
// //   timeout++;
// //   stream.abort();
// //   await sleep(2 ** timeout * 1000);
// //   streamTweets(socket, token);
// // };

// // io.on("connection", async (socket) => {
// //   try {
// //     const token = BEARER_TOKEN;
// //     streamTweets(io, token);
// //   } catch (e) {
// //     io.emit("authError", authMessage);
// //   }
// // });

// // server.listen(port, () => console.log(`Listening on port ${port}`));

// // // app.get("/", (req, res) => {
// // //   res.sendFile(__dirname + "/index.html");
// // // });

// const express = require("express");
// const bodyParser = require("body-parser");
// const util = require("util");
// const request = require("request");
// const path = require("path");
// const socketIo = require("socket.io");
// const http = require("http");

// const app = express();
// let port = process.env.PORT || 3003;
// const post = util.promisify(request.post);
// const get = util.promisify(request.get);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// const BEARER_TOKEN =
//   "AAAAAAAAAAAAAAAAAAAAAKqGGAEAAAAAjF0QjBeWZBQiFVV1woQSptPNN9I%3D6KWCGUe5wVTdT5aHwrALj00V0N8alIgKMsciUAUVWZWCMh85Tm";

// let timeout = 0;

// const streamURL = new URL(
//   "https://api.twitter.com/2/tweets/sample/stream?expansions=author_id"
// );

// const rulesURL = new URL(
//   "https://api.twitter.com/2/tweets/search/stream/rules"
// );

// const errorMessage = {
//   title: "Please Wait",
//   detail: "Waiting for new Tweets to be posted...",
// };

// const authMessage = {
//   title: "Could not authenticate",
//   details: [
//     `Please make sure your bearer token is correct.
//       If using Glitch, remix this app and add it to the .env file`,
//   ],
//   type: "https://developer.twitter.com/en/docs/authentication",
// };

// const sleep = async (delay) => {
//   return new Promise((resolve) => setTimeout(() => resolve(true), delay));
// };

// const streamTweets = (socket, token) => {
//   let stream;

//   const config = {
//     url: streamURL,
//     auth: {
//       bearer: token,
//     },
//     timeout: 31000,
//   };

//   try {
//     const stream = request.get(config);

//     console.log("hi");
//     stream
//       .on("data", (data) => {
//         try {
//           const json = JSON.parse(data);
//           if (json.connection_issue) {
//             socket.emit("error", json);
//             reconnect(stream, socket, token);
//           } else {
//             if (json.data) {
//               socket.emit("tweet", json);
//             } else {
//               socket.emit("authError", json);
//             }
//           }
//         } catch (e) {
//           socket.emit("heartbeat");
//         }
//       })
//       .on("error", (error) => {
//         // Connection timed out
//         socket.emit("error", errorMessage);
//         reconnect(stream, socket, token);
//       });
//   } catch (e) {
//     socket.emit("authError", authMessage);
//   }
// };

// const reconnect = async (stream, socket, token) => {
//   timeout++;
//   stream.abort();
//   await sleep(2 ** timeout * 1000);
//   streamTweets(socket, token);
// };

// io.on("connection", async (socket) => {
//   try {
//     const token = BEARER_TOKEN;
//     // io.emit("connect", "Client connected");
//     const stream = streamTweets(io, token);
//   } catch (e) {
//     io.emit("authError", authMessage);
//   }
// });

// server.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("express");
var http = require("http");
var socketIo = require("socket.io");
const request = require("request");

var app = express();
app.set("port", 3003);
var server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const streamTweets = (socket, token) => {
  const config = {
    url: "https://api.twitter.com/2/tweets/sample/stream?expansions=author_id",
    auth: {
      bearer:
        "AAAAAAAAAAAAAAAAAAAAAKqGGAEAAAAAjF0QjBeWZBQiFVV1woQSptPNN9I%3D6KWCGUe5wVTdT5aHwrALj00V0N8alIgKMsciUAUVWZWCMh85Tm",
    },
    timeout: 31000,
  };

  try {
    const stream = request.get(config);

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);
          if (json.connection_issue) {
            socket.emit("error", json);
          } else {
            if (json.data) {
              socket.emit("tweet", json);
            } else {
              socket.emit("authError", json);
            }
          }
        } catch (e) {
          socket.emit("heartbeat");
        }
      })
      .on("error", (error) => {
        socket.emit("error", "");
      });
  } catch (e) {
    socket.emit("authError", "");
  }
};

io.on("connection", async (socket) => {
  console.log("hi");
  const stream = streamTweets(
    io,
    "AAAAAAAAAAAAAAAAAAAAAKqGGAEAAAAAjF0QjBeWZBQiFVV1woQSptPNN9I%3D6KWCGUe5wVTdT5aHwrALj00V0N8alIgKMsciUAUVWZWCMh85Tm"
  );
});

server.listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
