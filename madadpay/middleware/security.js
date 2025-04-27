import rateLimit from "express-rate-limit";

// API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

// Transaction limits middleware
export const checkTransactionLimit = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  // New users have lower limits
  const maxAmount = user.isVerified ? 10000 : 2000;

  if (req.body.amount > maxAmount) {
    return res.status(400).json({
      success: false,
      message: `Transaction limit exceeded. Max allowed: ₹${maxAmount}`,
    });
  }

  next();
};
