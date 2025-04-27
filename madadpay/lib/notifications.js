import { getIO } from "./socket";

export const sendNotification = async (userId, message) => {
  try {
    const io = getIO();
    io.to(userId).emit("notification", { message });

    await User.findByIdAndUpdate(userId, {
      $push: {
        notifications: {
          message,
          read: false,
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error("Notification error:", error);
  }
};
