import jwt from "jsonwebtoken";

export default async function authUser(req, res, next) {
  const { token } = req.headers;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Autherized login again",
    });
  }
  try {
    const secret = process.env.JWT_SECRET;
    const token_decode = jwt.verify(token, secret);

    if (!req.body) req.body = {};

    req.body.userId = token_decode.id;
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
