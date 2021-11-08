import { Router } from "express";
import LeadController from "../controllers/LeadController";

const router = Router();

router.get('/events',LeadController.getAll);

export default router;