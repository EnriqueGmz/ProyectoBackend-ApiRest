import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token)
            throw new Error("No existe el token en el header usa Bearer");

        token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);

        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });

        // return res.status(401).json({ error: error.message });

    }
}