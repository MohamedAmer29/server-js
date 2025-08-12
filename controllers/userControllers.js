import User from "../module/useDb.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function createToken(id) {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id }, secret);
}

//Route for user login
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All three enteries: name, email and password",
      });
    }
    // checking user already exists or not
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Plase provide a validate email",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Plase provide a strong password",
      });
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      message: "Registered Successfully",
    });
    //catch
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

//Route for user Registration
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User doesn't exists",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.status(200).json({
        success: true,
        token,
        message: "Logged Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  }
  try {
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

//Route for admin login
export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(email + password, secret);
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
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
