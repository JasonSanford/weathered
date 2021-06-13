declare type ForecastType = 'hourly' | 'baseline';
declare type Area = 'AL' | 'AK' | 'AS' | 'AR' | 'AZ' | 'CA' | 'CO' | 'CT' | 'DE' | 'DC' | 'FL' | 'GA' | 'GU' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VI' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY' | 'PZ' | 'PK' | 'PH' | 'PS' | 'PM' | 'AN' | 'AM' | 'GM' | 'LS' | 'LM' | 'LH' | 'LC' | 'LE' | 'LO';
declare type Region = 'AL' | 'AT' | 'GL' | 'GM' | 'PA' | 'PI';
declare type RegionType = 'land' | 'marine';
declare type Urgency = 'immediate' | 'expected' | 'future' | 'past' | 'unknown';
declare type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
declare type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
declare type AreaOption = {
    area?: Area | Area[];
};
declare type PointOption = {
    latitude?: number;
    longitude?: number;
};
declare type RegionOption = {
    region?: Region | Region[];
};
declare type RegionTypeOption = {
    regionType?: RegionType;
};
declare type UrgencyOption = {
    urgency?: Urgency;
};
declare type AlertOptions = UrgencyOption & XOR<AreaOption, XOR<PointOption, XOR<RegionOption, RegionTypeOption>>>;
declare type ClientOptions = {
    userAgent?: string;
};
declare type PointResponse = {
    properties: {
        forecast: string;
        forecastHourly: string;
    };
};
declare type ForecastPeriod = {
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
declare type ForecastProperties = {
    updated: string;
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: {
        value: number;
        unitCode: string;
    };
    periods: ForecastPeriod[];
};
declare type ForecastResponse = {
    properties: ForecastProperties;
};
declare type AlertsFeature = {
    id: string;
    geometry: {
        type: 'Polygon';
        coordinates: number[][];
    };
    properties: {
        areaDesc: string;
        sent: string;
        effective: string;
        expries: string;
        description: string;
    };
};
declare type AlertsResponse = {
    features: AlertsFeature[];
};
export { ForecastType, Area, Region, RegionType, Urgency, AlertOptions, ClientOptions, PointResponse, ForecastResponse, AlertsResponse, AlertsFeature };
