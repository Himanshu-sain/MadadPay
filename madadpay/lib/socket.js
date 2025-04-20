import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_SERVER || "http://localhost:3001",
  {
    withCredentials: true,
    autoConnect: false, // Connect manually when needed
  }
);

export default socket;
