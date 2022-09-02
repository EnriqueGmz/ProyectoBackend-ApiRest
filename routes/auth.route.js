import express from "express";
import { infoUser, login, refreshToken, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/ValidationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = express.Router();

// Rutas
router.post(
    "/register",
    [body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres")
        .trim()
        .isLength({ min: 6 }),
    body("password", "Formato de password incorrecta")
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas")
            }
            return value;
        })
    ],
    validationResultExpress,
    register
);
router.post("/login",
    [body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    ],
    validationResultExpress,
    login
);
router.get("/protected", requireToken, infoUser);
router.get("/refresh", refreshToken);

export default router;


