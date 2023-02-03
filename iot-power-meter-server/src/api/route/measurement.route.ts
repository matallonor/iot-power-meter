import express from 'express';
import {
    getMeasurement, getMonthMeasurement
} from '../controller/measurement.controller';

const router = express.Router();

router.get('/', getMeasurement);

router.get('/month', getMonthMeasurement);

// router.get('/me', checkAuth, userControllers.getMe);

export default router;
