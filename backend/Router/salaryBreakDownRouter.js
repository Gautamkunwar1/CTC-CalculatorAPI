import express from "express";
import { calculateCTC } from "../Controller/SalaryBreakDownController.js";

const CTCRouter = express.Router();
CTCRouter.post("/calculateCTC",calculateCTC);

export default CTCRouter;