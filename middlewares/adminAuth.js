import jwt from "jsonwebtoken";

export async function adminAUth(req, res, next) {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    let token_decode;
    if (Array.isArray(token)) {
      const secret = process.env.JWT_SECRET;
      token_decode = jwt.verify(token[0], secret);
    } else if (typeof token === "string") {
      const secret = process.env.JWT_SECRET;
      token_decode = jwt.verify(token, secret);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }
    const tokenData = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    if (token_decode !== tokenData) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized login again",
      });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}
