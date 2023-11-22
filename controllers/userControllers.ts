import { Request, Response } from "express";
import User from "../models/userModel";
import { hash, compare, genSalt } from "bcrypt";
import jwt from "jsonwebtoken";

const serverError = "Server error";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
    const checkMail = await User.findOne({ email: email });
    if (checkMail) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const user = await User.create({
        name,
        lastname,
        email,
        password: hashedPassword,
      });
      if (user) {
        res.status(201).json({ message: "User created successfully" });
      } else {
        res.status(400).json({ message: "Error while creating user" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: serverError });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      const isMatch = await compare(password, checkUser.password);
      if (isMatch) {
        const token = jwt.sign({ id: checkUser._id }, process.env.JWT_TOKEN, {
          expiresIn: "1d",
        });
        res.status(200).json({ message: "Login successful", token: token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: serverError });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const { _id, name, lastname, email } = await User.findById(
      req.body.user.id
    );
    const userData = { _id, name, lastname, email };
    res.status(200).json({ message: "Data retrieved successfully", userData });
  } catch (error) {
    res.status(500).json({ message: serverError });
  }
};
