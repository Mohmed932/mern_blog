import jwt from "jsonwebtoken";

// Middleware to check JWT on protected routes

export const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SCRECT_KEY);
    res.user = decodedToken;
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError &&
      error.message === "jwt malformed"
    ) {
      return res.status(401).json({ message: "Invalid token format" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
