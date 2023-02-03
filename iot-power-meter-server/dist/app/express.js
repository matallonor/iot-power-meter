"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const measurement_route_1 = __importDefault(require("./route/measurement.route"));
const app = (0, express_1.default)();
app.use('/measurement', measurement_route_1.default);
exports.default = app;
//# sourceMappingURL=express.js.map