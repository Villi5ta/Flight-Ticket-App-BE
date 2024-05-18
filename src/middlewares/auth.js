import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    req.body.userId = decoded.user_id;

    return next();
  });
};

export default authUser;
