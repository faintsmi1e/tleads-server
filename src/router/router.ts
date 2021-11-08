import { Router } from "express";
import LeadController from "../controllers/LeadController";

const router = Router();

router.get('/leads',LeadController.getAll);
router.get('/leads/:authKey',LeadController.authorization);

export default router;