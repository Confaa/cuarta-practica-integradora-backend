import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { transport } from "../config/mail.config.js";

const router = Router();

router.get("/", async (req, res) => {
  res.send("Hola mundo");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
export default router;
