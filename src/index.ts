import Client from './client';

export { ForecastType, ClientOptions, PointResp, Area } from './types';

export default Client;

async function go() {
  const client = new Client();
  // const forecast = await client.getForecastForPoint(35.6142057, -80.7750328, 'hourly');
  // console.log(forecast);
  const alerts = await client.getAlertsForArea('TX');
  console.log(alerts.features.length);
  // const point = await client.getPoint(35.6142057, -80.7750328);
}

go();
