"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const measurement_controller_1 = require("../controller/measurement.controller");
const router = express_1.default.Router();
router.get('/', measurement_controller_1.getHelloWorld);
// get today's consumption from 0 am
router.get('/today', measurement_controller_1.getTodayMeasurements);
// get month's consumption up to now
router.post('/month', measurement_controller_1.getMonthMeasurements);
// router.get('/me', checkAuth, userControllers.getMe);
exports.default = router;
//# sourceMappingURL=measurement.route.js.map