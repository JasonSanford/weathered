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

type XOR<T, U> = (T | U) extends object
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

interface PointResp {
  properties: {
    forecast: string;
    forecastHourly: string;
  }
}

export { ForecastType, Area, AlertOptions, ClientOptions, PointResp };
