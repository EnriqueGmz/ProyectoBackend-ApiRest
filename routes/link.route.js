import { Router } from "express";
import { getLinks } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

//GET           /api/v1/links        all links
//GET           /api/v1/links/:id    singleling
//POST          /api/v1/links        create link
//PATCH/PUT     /api/v1/links/:id    update link
//DELETE        /api/v1/links/:id    delete link      

router.get("/", requireToken, getLinks);


export default router;