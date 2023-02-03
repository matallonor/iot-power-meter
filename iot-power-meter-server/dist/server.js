"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./app/express"));
const mqtt_1 = require("./app/mqtt");
const port = process.env.PORT || '3000';
express_1.default.listen(port);
const mqtt = new mqtt_1.Mqtt();
mqtt.init();
// Every message needs to be parsed and stored in the DB
mqtt.connect().subscribe(m => console.log(m));
setInterval(_ => mqtt.publish('1'), 5000);
//# sourceMappingURL=server.js.map