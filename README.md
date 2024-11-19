## weathered 🌤⛈☀️🌨

A JavaScript wrapper for the [National Weather Service API](https://www.weather.gov/documentation/services-web-api) - built with TypeScript.

![Status](https://github.com/JasonSanford/weathered/actions/workflows/ci.yml/badge.svg)

[Source code](https://github.com/JasonSanford/weathered)

## Documentation

A couple examples are below. There is also extensive typedoc generated [documentation](https://jasonsanford.github.io/weathered/).

## Installation

```bash
npm install weathered
```

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

### Get the closest weather stations for a given latitude and longitude

```javascript
const stations = await client.getStations(latitude, longitude);
stations.features.forEach(station => console.log(station.properties.name));
// San Francisco, San Francisco International Airport
// SAN FRANCISCO DOWNTOWN
// Half Moon Bay Airport
```

### Get the closest weather station for a given latitude and longitude

```javascript
const nearestStation = await client.getNearestStation(latitude, longitude);
if (nearestStation) {
  console.log(nearestStation.properties.stationIdentifier);
}
// KSFO
```

### Get weather observations for a given station

```javascript
const nearestStation = await client.getNearestStation(latitude, longitude);
if (nearestStation) {
  const { stationIdentifier } = nearestStation.properties;
  const observations = await client.getStationObservations(stationIdentifier);
  observations.features.forEach(obs => console.log(obs.properties.temperature));
  // { value: 16.1, unitCode: 'unit:degC', qualityControl: 'qc:V' }
  // { value: 16.7, unitCode: 'unit:degC', qualityControl: 'qc:V' }
  // { value: 17.2, unitCode: 'unit:degC', qualityControl: 'qc:V' }
}
```

### Get the latest weather observation for a given station

```javascript
const latestObservation = await client.getLatestStationObservations('KSFO');
console.log(latestObservation.properties.relativeHumidity);
// { value: 64.486025639597, unitCode: 'unit:percent', qualityControl: 'qc:V' }
```
