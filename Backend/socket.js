const socketIo = require("socket.io");
const User = require("./models/user");
const Captain = require("./models/captain");
let io;

exports.initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} Joined as ${userType}`)

      if (userType === "user") {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on('update-location-captain',async (data)=>{
      const {userId,location}=data;
      if(!location||!location.ltd||!location.lng){
        return socket.emit('error',{message:'Invalid locations'})
      }
      await Captain.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [location.lng, location.ltd]
        }
      })
    })

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

exports.sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event,messageObject.data);
  } else {
    console.log("Socket.io is Not intialized");
  }
};
