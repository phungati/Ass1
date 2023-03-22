import express from "express";
import { getAll, create, getOne, edit, del } from "../controllers/product";
const router = express.Router();

router.get("/products", getAll)
router.get("/products/:id", getOne)
router.post("/products", create)
router.put("/products/:id", edit)
router.delete("/products/:id", del)

export default router;