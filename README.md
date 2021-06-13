## weathered 🌤⛈☀️🌨

A JavaScript wrapper for the [National Weather Service API](https://www.weather.gov/documentation/services-web-api) - built with TypeScript.

## Documentation

Extensive typedoc generated documentation here - [documentation](https://jasonsanford.github.io/weathered/)

## Getting Started

### Import and instantiate a client

```javascript
import { Client } from 'weathered';

const client = new Client();
```

### Get active weather alerts for a location (latitude and longitude)

```javascript
const active = true;
const latitude = 35.6175667;
const longitude = -80.7709911;
const alerts = await client.getAlerts(active, { latitude, longitude });

alerts.features.forEach(feature => {
  console.log(feature.properties.description);
  console.log(feature.geometry);
});
// At 744 PM EDT, Doppler radar indicated strong thunderstorms along a
// line extending from 11 miles southeast of Yadkinville to 6 miles
// south of Mocksville to 7 miles northwest of Huntersville, and moving
// east at 20 mph.
// {
//   type: 'Polygon',
//   coordinates: [
//     [ [Array], [Array] ]
//   ]
// }
```

### Get all weather alerts (active or inactive) for a region

```javascript
const alerts = await client.getAlerts(active, { region: 'AL' });
alerts.features.forEach(feature => {
  console.log(feature.properties.description);
  console.log(feature.geometry);
});
// The Flood Warning continues for
// the Pearl River Above Philadelphia ...
// {
//   type: 'Polygon',
//   coordinates: [
//     [ [Array], [Array] ]
//   ]
// }
```

### Get weather forecast for a location (latitude and longitude)

```javascript
const forecast = await client.getForecast(latitude, longitude, 'baseline');
forecast.properties.periods.forEach(period => {
  console.log(`${period.name}: ${period.detailedForecast}`);
});
// Today Partly sunny, with a high near 86. Northeast wind 2 to 6 mph.
// Tonight Partly cloudy, with a low around 68. South southeast wind around 3 mph.
```
