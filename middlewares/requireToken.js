import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.Authorization;
        if (!token)
            throw new Error("No existe el token en el header usa Bearer");

        token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);

        const TokenVerificationErrors = {
            "invalid signature": "la firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no válido"
        }

        return res
            .status(401)
            .send({ error: TokenVerificationErrors[error.message] });

        // return res.status(401).json({ error: error.message });

    }
}