import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Ensure req.body is defined
    req.body = req.body || {};
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("JWT Error:", error);
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
