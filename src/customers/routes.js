import express from 'express';
import { getCustomersWithOrderStats } from './get-customers-with-order-stats.js';

const router = express.Router();

router.get('/', getCustomersWithOrderStats);

export default router;
