## weathered 🌤⛈☀️🌨

A JavaScript wrapper for the [National Weather Service API](https://www.weather.gov/documentation/services-web-api) - built with TypeScript.

## Documentation

Extensive typedoc generated documentation here - [documentation](https://jasonsanford.github.io/weathered/)

## Getting Started

### Get weather alerts for a location (latitude and longitude)

```javascript
import { Client } from 'weathered';

const client = new Client();
const alerts = await client.getAlerts(false, { latitude: 35.6175667, longitude: -80.7709911 });

```
