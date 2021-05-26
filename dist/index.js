"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
exports.default = client_1.default;
async function go() {
    const client = new client_1.default();
    // const results = await Promise.all([
    //   client.getAlerts({ active: true }),
    //   client.getAlerts({ active: true, area: 'NC' }),
    //   client.getAlerts({ active: false, latitude: 35.6142057, longitude: -80.7750328 }),
    //   client.getAlerts({ active: true, regionType: 'land', urgency: 'expected' }),
    // ]);
    // console.log(results.map(result => result.features.length));
    const forecast = await client.getForecast(35.6142057, -80.7750328, 'baseline');
    console.log(forecast.properties.periods[0].name);
    // await client.getAlerts({ active: true });
    // await client.getAlerts({ active: true, area: 'NC' });
    // await client.getAlerts({ active: true, latitude: 45, longitude: -100 });
    // await client.getAlerts({ active: false, regionType: 'marine' })
    // const alerts3 = await client.getAlerts({ active: true, area: 'NC', latitude: 45, longitude: -100 }); // fails
    // console.log(alerts);
    // const point = await client.getPoint(35.6142057, -80.7750328);
}
go();
