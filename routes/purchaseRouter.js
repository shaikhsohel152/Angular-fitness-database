import express from "express";

import {
 getAllPurchase,
 postPurchase,
 updatePurchase,
 deletePurchase
} from "../Controllers/purchaseControllers.js";

let router = express();

router.get("/", getAllPurchase);

router.post("/", postPurchase);

router.put("/:id", updatePurchase);

router.delete("/:id", deletePurchase);

export default router;