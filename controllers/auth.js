import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import * as EmailValidator from "email-validator";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    const genSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, genSalt);

    const validateEmail = (email) => {
      if (EmailValidator.validate(email) === true) {
        return email;
      } else {
        throw new Error("invalid email");
      }
    };

    const newUser = new UserModel({
      firstName,
      lastName,
      userName,
      email: validateEmail(email),
      password: passwordHash,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.message.includes("userName")) {
      res.status(404).json({ message: "username has been taken" });
    }
    if (err.message.includes("email")) {
      res.status(404).json({ message: "email has been taken" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { nameOrEmail, password } = req.body;

    const user =
      (await UserModel.findOne({ userName: nameOrEmail })) ||
      (await UserModel.findOne({ email: nameOrEmail }));

    if (!user) {
      throw new Error("user not found");
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      throw new Error("password does not match");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);

    res.status(200).send({ token, user });
  } catch (err) {
    res.status(404).json({message:err.message})
  }
};
