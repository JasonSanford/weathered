type ForecastType = 'hourly' | 'baseline';

type Area = 'AL' | 'AK' | 'AS' | 'AR' | 'AZ' | 'CA' | 'CO' | 'CT' | 'DE' |
            'DC' | 'FL' | 'GA' | 'GU' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' |
            'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' |
            'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' |
            'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD' |
            'TN' | 'TX' | 'UT' | 'VT' | 'VI' | 'VA' | 'WA' | 'WV' | 'WI' |
            'WY' | 'PZ' | 'PK' | 'PH' | 'PS' | 'PM' | 'AN' | 'AM' | 'GM' |
            'LS' | 'LM' | 'LH' | 'LC' | 'LE' | 'LO';
interface ClientOptions {
  userAgent?: string;
}

interface PointResp {
  properties: {
    forecast: string;
    forecastHourly: string;
  }
}

export { ForecastType, Area, ClientOptions, PointResp };
