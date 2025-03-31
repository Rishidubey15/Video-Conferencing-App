import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import User from "../models/user.model.js";
import crypto from "crypto";

const register = async (req, res) => {
  let { name, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      password: hashedPassword,
      username,
    });

    await newUser.save();
    res
      .status(httpStatus.CREATED)
      .json({ message: "New user created successfully" });
  } catch (err) {
    return res.status(500).json({ message: `Something went wrong! ${err}` });
  }
};

const login = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `Please provide username and password` });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `No user exists!` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    let token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    res.status(200).json({ message: "Login successful", token });
    await user.save();
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong${e}` });
  }
};

export { login, register };
