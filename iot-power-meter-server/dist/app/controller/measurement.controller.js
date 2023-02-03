"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthMeasurements = exports.getTodayMeasurements = exports.getHelloWorld = void 0;
const measurement_model_1 = require("../model/measurement.model");
const getHelloWorld = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.send('Hello world!'); });
exports.getHelloWorld = getHelloWorld;
const getTodayMeasurements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const param = req.user.myParam
    // const measurement = await Measurement.findByToday(param)
    /* TODO: Fetch from InfluxDB */
    const measurement = new measurement_model_1.Measurement(1, 1);
    res.status(200).json({
        message: "Found",
        measurement,
    });
});
exports.getTodayMeasurements = getTodayMeasurements;
const getMonthMeasurements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const param = req.user.myParam
    // const measurement = await Measurement.findByToday(param)
    const measurement = new measurement_model_1.Measurement(1, 1);
    res.status(200).json({
        message: "Found",
        measurement,
    });
});
exports.getMonthMeasurements = getMonthMeasurements;
//# sourceMappingURL=measurement.controller.js.map