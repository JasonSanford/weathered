type ForecastType = 'hourly' | 'baseline';

interface ClientOptions {
  userAgent?: string;
}

interface PointResp {
  properties: {
    forecast: string;
    forecastHourly: string;
  }
}

export { ForecastType, ClientOptions, PointResp };
