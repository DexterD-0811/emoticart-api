import express from "express";
import { addUser } from "./controllers/add-user.js";
import { getAllUsers } from "./controllers/get-all-users.js";
import { getAllCustomers } from "./controllers/get-all-customers.js";
import { updateUser } from "./controllers/update-user.js";
import { deleteUser } from "./controllers/delete-user.js";
import { searchCustomer } from "./controllers/search-customer.js";
import { getUser } from "./controllers/get-user.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/customers", getAllCustomers);
router.get("/search", searchCustomer);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
