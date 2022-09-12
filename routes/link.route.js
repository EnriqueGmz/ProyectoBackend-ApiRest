import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

//GET           /api/v1/links        all links
//GET           /api/v1/links/:id    singleling
//POST          /api/v1/links        create link
//PATCH/PUT     /api/v1/links/:id    update link
//DELETE        /api/v1/links/:id    delete link      

router.get("/", requireToken, getLinks);
// router.get("/:id", requireToken, getLinkCRUD); Usado con el CRUD TRADICIONAL, no requiere require por que son rutas publicas
router.get("/:nanoLink", getLink);
router.post("/", requireToken, bodyLinkValidator, createLink);
router.delete("/:id", requireToken, paramLinkValidator, removeLink);
router.patch("/:id", requireToken, paramLinkValidator, bodyLinkValidator, updateLink);


export default router;