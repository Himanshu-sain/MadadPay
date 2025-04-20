import { Server } from "socket.io";

let io;

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New connection:", socket.id);

      // User online aaya hai
      socket.on("register-user", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} connected`);
      });

      // Cash chahiye wala request karega
      socket.on("request-cash", async (data) => {
        const { userId, amount, location } = data;

        // MongoDB se nearby users dhundho
        // Yahan aap actual MongoDB query lagayenge
        const nearbyUsers = [{ id: "shyam123", name: "Shyam", distance: 0.5 }];

        // Request bhejo available users ko
        nearbyUsers.forEach((user) => {
          io.to(user.id).emit("cash-request", {
            from: userId,
            amount,
            location,
          });
        });
      });

      // Request accept/reject
      socket.on("respond-request", (response) => {
        io.to(response.toUserId).emit("request-response", {
          status: response.status,
          user: response.user,
        });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
  res.end();
}
