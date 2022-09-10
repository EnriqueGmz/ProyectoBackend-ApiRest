import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token)
            // throw new Error("Utiliza formato Bearer");
            return res.status(401).json({ error: "No Bearer" });

        token = token.split(" ")[1];

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);

        // if (error) {
        //     return res.status(401).json({ error: error.message });
        // } Se paso arriba como un return para que funcione el tokenVerificationErrors y el throw new error  
        //cuando falta el bearer
        return res
            .status(401)
            .send({ error: tokenVerificationErrors[error.message] });
    }
};