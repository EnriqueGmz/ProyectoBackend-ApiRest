import express from "express";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
// import { body } from "express-validator";
// import { validationResultExpress } from "../middlewares/ValidationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
const router = express.Router();

// Rutas
router.post("/register", bodyRegisterValidator, register);
router.post("/login", bodyLoginValidator, login);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

export default router;


