import express from "express";

import {
 getAllTraining,
 postTraining,
 updateTraining,
 deleteTraining
} from "../Controllers/trainingControllers.js";

let router = express();

router.get("/", getAllTraining);

router.post("/", postTraining);

router.put("/:id", updateTraining);

router.delete("/:id", deleteTraining);

export default router;

