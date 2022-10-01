import "dotenv/config";
import "./database/connectdb.js"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

// app.use(
//     cors({ origin: [process.env.ORIGIN1] }) Se puede pasar directamente no sale la consola por que no trabajamos con json
// );

// const whiteList = [process.env.ORIGIN1, ];

// Dos para usar dos frameworks
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

//para usar POSTMAN
app.use(
    cors({
        origin: function (origin, callback) {
            console.log("😮😥😣 =>", origin)
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin)
            };
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!"
            );
        },
    })
);

//ESTE ES EL QUE SE USA SIN POSTMAN
// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (whiteList.includes(origin)) {
//                 return callback(null, origin)
//             };
//             return callback(
//                 "Error de CORS origin: " + origin + " No autorizado!"
//             );
//         },
//     })
// );



// Middlewares
app.use(express.json());
app.use(cookieParser());

// Ejemplo back redirect (opcional)
app.use("/", redirectRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);


// Solo para el ejemplo de Login/token
// app.use(express.static("public")); Era solo de ejemplo

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀🚀🚀 http://localhost:" + PORT));