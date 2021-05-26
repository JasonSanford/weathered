type ForecastType = 'hourly' | 'baseline';

type Area = 'AL' | 'AK' | 'AS' | 'AR' | 'AZ' | 'CA' | 'CO' | 'CT' | 'DE' |
            'DC' | 'FL' | 'GA' | 'GU' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' |
            'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' |
            'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' |
            'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD' |
            'TN' | 'TX' | 'UT' | 'VT' | 'VI' | 'VA' | 'WA' | 'WV' | 'WI' |
            'WY' | 'PZ' | 'PK' | 'PH' | 'PS' | 'PM' | 'AN' | 'AM' | 'GM' |
            'LS' | 'LM' | 'LH' | 'LC' | 'LE' | 'LO';

type Region = 'AL' | 'AT' | 'GL' | 'GM' | 'PA' | 'PI';

type RegionType = 'land' | 'marine';

type Urgency = 'immediate' | 'expected' | 'future' | 'past' | 'unknown';

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type XOR<T, U> = (T | U) extends object // eslint-disable-line
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

interface AreaOption {
  area?: Area | Area[];
}

interface PointOption {
  latitude?: number;
  longitude?: number;
}

interface RegionOption {
  region?: Region | Region[];
}

interface RegionTypeOption {
  regionType?: RegionType;
}
interface ActiveOption {
  active: boolean;
}

interface UrgencyOption {
  urgency?: Urgency;
}

type AlertOptions = ActiveOption & UrgencyOption & XOR<AreaOption, XOR<PointOption, XOR<RegionOption, RegionTypeOption>>>;

interface ClientOptions {
  userAgent?: string;
}

interface PointResponse {
  properties: {
    forecast: string;
    forecastHourly: string;
  }
}

interface ForecastPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend?: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}
interface ForecastProperties {
  updated: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: { value: number, unitCode: string };
  periods: ForecastPeriod[];
}
interface ForecastResponse {
  properties: ForecastProperties;
}

interface AlertsFeature {
  id: string;
  geometry: {
    type: 'Polygon',
    coordinates: number[][];
  };
  properties: {
    areaDesc: string;
    sent: string;
    effective: string;
    expries: string;
    description: string;
  };
}
interface AlertsResponse {
  features: AlertsFeature[];
}

export { ForecastType, Area, Region, RegionType, Urgency, AlertOptions, ClientOptions, PointResponse, ForecastResponse, AlertsResponse };
