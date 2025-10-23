import express from "express";
import { addOrder } from "./controllers/add-order.js";
import { getOrder } from "./controllers/get-order.js";
import { searchOrder } from "./controllers/search-order.js";
import { filterOrdersByDate } from "./controllers/filter-orders-by-date.js";
import { getAllOrders } from "./controllers/get-all-orders.js";
import { updateOrder } from "./controllers/update-order.js";
import { deleteOrder } from "./controllers/delete-order.js";

const router = express.Router();

router.post("/", addOrder);
router.get("/", getAllOrders);
router.get("/search", searchOrder);
router.get("/filter", filterOrdersByDate);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
