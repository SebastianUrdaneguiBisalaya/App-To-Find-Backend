import { Router } from "express";
import { checkout } from "./controller";

const router = Router();

router.post("/checkout", checkout);

export default router;