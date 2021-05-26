"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
exports.default = client_1.default;
async function go() {
    const client = new client_1.default();
    // const forecast = await client.getForecastForPoint(35.6142057, -80.7750328, 'hourly');
    // console.log(forecast);
    const alerts = await client.getAlertsForArea('TX');
    console.log(alerts.features.length);
    // const point = await client.getPoint(35.6142057, -80.7750328);
}
go();
