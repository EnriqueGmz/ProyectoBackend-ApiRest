import { body, validationResult } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    next();
};

export const bodyRegisterValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecta").custom(
        (value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas")
            }
            return value;
        }
    ),
    validationResultExpress
];

export const bodyLoginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    validationResultExpress,
];
