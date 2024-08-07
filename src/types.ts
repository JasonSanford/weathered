type ForecastType = "hourly" | "baseline";

type Area =
  | "AL"
  | "AK"
  | "AS"
  | "AR"
  | "AZ"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "DC"
  | "FL"
  | "GA"
  | "GU"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "PR"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VI"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY"
  | "PZ"
  | "PK"
  | "PH"
  | "PS"
  | "PM"
  | "AN"
  | "AM"
  | "GM"
  | "LS"
  | "LM"
  | "LH"
  | "LC"
  | "LE"
  | "LO";

type Region = "AL" | "AT" | "GL" | "GM" | "PA" | "PI";

type RegionType = "land" | "marine";

type Urgency = "immediate" | "expected" | "future" | "past" | "unknown";

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type XOR<T, U> = T | U extends object // eslint-disable-line
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type AreaOption = {
  area?: Area | Area[];
};

type PointOption = {
  latitude?: number;
  longitude?: number;
};

type RegionOption = {
  region?: Region | Region[];
};

type RegionTypeOption = {
  regionType?: RegionType;
};

type UrgencyOption = {
  urgency?: Urgency;
};

type AlertOptions = UrgencyOption &
  XOR<AreaOption, XOR<PointOption, XOR<RegionOption, RegionTypeOption>>>;

type ClientOptions = {
  userAgent?: string;
};

type PointResponse = {
  properties: {
    forecast: string;
    forecastHourly: string;
    observationStations: string;
  };
};

type Station = {
  id: string;
  properties: {
    name: string;
    stationIdentifier: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

type StationsResponse = {
  features: Station[];
};

type PresentWeather = {
  [key: string]: string | null;
};

type Measure = {
  value: number;
  unitCode: string;
};

type ObservationResponse = {
  properties: {
    presentWeather: PresentWeather[];
    temperature: Measure;
    barometricPressure: Measure;
    seaLevelPressure: Measure;
    dewpoint: Measure;
    windDirection: Measure;
    windSpeed: Measure;
    windGust: Measure;
    visibility: Measure;
    relativeHumidity: Measure;
    heatIndex: Measure;
  };
};

type ObservationsResponse = {
  features: ObservationResponse[];
};

type ForecastPeriod = {
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
};

type ForecastProperties = {
  updated: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: { value: number; unitCode: string };
  periods: ForecastPeriod[];
};

type ForecastResponse = {
  properties: ForecastProperties;
};

type AlertsFeatureReference = {
  "@id": string;
  identifier: string;
  sender: string;
  sent: string;
};

type AlertsFeature = {
  id: string;
  geometry: {
    type: "Polygon";
    coordinates: number[][];
  };
  properties: {
    areaDesc: string;
    sent: string;
    effective: string;
    expries: string;
    description: string;
    parameters?: {
      [key: string]: any[];
    };
    id: string;
    geocode: {
      [key: string]: string[];
    };
    affectedZones: string[];
    references: AlertsFeatureReference[];
    onset: string;
    expires: string;
    ends: string;
    status: string;
    messageType: string;
    category: string;
    severity: string;
    certainty: string;
    urgency: string;
    event: string;
    sender: string;
    senderName: string;
    headline: string;
    instruction: string;
    response: string;
  };
};

type AlertsResponse = {
  features: AlertsFeature[];
};

export {
  ForecastType,
  Area,
  Region,
  RegionType,
  Urgency,
  AlertOptions,
  ClientOptions,
  PointResponse,
  ForecastResponse,
  ForecastProperties,
  Station,
  StationsResponse,
  AlertsResponse,
  AlertsFeature,
  ObservationsResponse,
  ObservationResponse,
  Measure,
  ForecastPeriod,
};
