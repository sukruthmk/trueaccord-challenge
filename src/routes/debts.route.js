import express from "express";

import debtsController from "../controllers/debts.controller";

const router = express.Router();
router.get("/", debtsController.getAllDebts);

export default router;
