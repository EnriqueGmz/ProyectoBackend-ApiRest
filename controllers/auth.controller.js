import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // alternativa dos
        let user = await User.findOne({ email: email });
        if (user) throw new Error("Ya existe el usuario");
        // if (user) throw { code: 11000 }; ALternativa 1 de bluuweb

        user = new User({ email, password });
        await user.save();

        //jwt token

        return res.json({ ok: true });
        // return res.status(201).json({ ok: true }) // el 201 es de crear
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });

        /*Alternativa 1 de bluuweb de mongoose
         console.log(error.code);
         if (error.code === 11000) {
             return res.status(400).json({ error: "Ya existe este usuario" });
         }return res.status(500).json({ error: "Error del servidor" }) 
         Opcional*/
    };
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email })
        if (!user) throw new Error("No existe este usuario");
        // return res.status(403).json({ error: "No existe este usuario" }); // se quita el throw, se usa esto y se elimina el 403 del catch

        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword) throw new Error("Contraseña incorrecta");
        // return res.status(403).json({ error: "contraseña incorrecta" }); // se quita el throw, se usa esto y se elimina el 403 del catch

        // Generar el token JWT

        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET)

        return res.json({ token });
    } catch (error) {
        // console.log(error);
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        return res.status(500).json({ error: "Error del servidor" });
    }
};
