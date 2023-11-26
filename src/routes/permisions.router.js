import { Router } from "express";
import { userService } from "../dao/repositories/index.js";

const router = Router();

router.get("/premium/:uid", async (req, res) => {
  let uid = req.params.uid;
  let user = await userService.getUserById(uid);
  if (req.user.role === "premium") {
    await userService.updateUser(user.email, { role: "user" });
  } else {
    await userService.updateUser(user.email, { role: "premium" });
  }
});
export default router;
