import { Router } from "express";
import { createUserController, loginController, logoutController } from "../Controller/userController.js";
import { body } from "express-validator";
import { authUser } from "../Middlewares/loggedinUser.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be valid email address"),
  body("password").isLength({ min: 3 }).withMessage("Password must be at least 3 character long"),
  createUserController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be valid email address"),
  body("password").isLength({ min: 3 }).withMessage("Password must be at least 3 character long"),
  loginController
);

router.get("/logout", authUser, logoutController);

export default router;