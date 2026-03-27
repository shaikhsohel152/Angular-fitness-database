import express from "express";

import { postMessage, getMessage } from "../Controllers/requestController.js";

let router = express();

router.post("/",postMessage);
router.get("/",getMessage);

export default router;