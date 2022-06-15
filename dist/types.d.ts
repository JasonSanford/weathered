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
        observationStations: string;
    };
};
declare type Station = {
    id: string;
    properties: {
        name: string;
        stationIdentifier: string;
    };
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
};
declare type StationsResponse = {
    features: Station[];
};
declare type PresentWeather = {
    [key: string]: string | null;
};
declare type Measure = {
    value: number;
    unitCode: string;
};
declare type ObservationResponse = {
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
declare type ObservationsResponse = {
    features: ObservationResponse[];
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
declare type AlertsFeatureReference = {
    '@id': string;
    identifier: string;
    sender: string;
    sent: string;
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
declare type AlertsResponse = {
    features: AlertsFeature[];
};
export { ForecastType, Area, Region, RegionType, Urgency, AlertOptions, ClientOptions, PointResponse, ForecastResponse, ForecastProperties, Station, StationsResponse, AlertsResponse, AlertsFeature, ObservationsResponse, ObservationResponse, Measure };
