type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;
type TDateISODate = `${TYear}-${TMonth}-${TDay}`;
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
type TDateTimeISO = `${TDateISODate}T${TDateISOTime}Z`;

type UvRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface UvStatus {
  uv: UvRange;
  uv_time: TDateTimeISO;
  uv_max: number;
  uv_max_time: TDateTimeISO;
  ozone: number;
  ozone_time: TDateTimeISO;
  safe_exposure_time: SafeExposureTime;
}

export interface SafeExposureTime {
  st1: number;
  st2: number;
  st3: number;
  st4: number;
  st5: number;
  st6: number;
}

export interface SunInfo {
  sun_times: SunTimes;
  sun_position: SunPosition;
}

export interface SunTimes {
  solarNoon: TDateTimeISO;
  nadir: TDateTimeISO;
  sunrise: TDateTimeISO;
  sunset: TDateTimeISO;
  sunriseEnd: TDateTimeISO;
  sunsetStart: TDateTimeISO;
  dawn: TDateTimeISO;
  dusk: TDateTimeISO;
  nauticalDawn: TDateTimeISO;
  nauticalDusk: TDateTimeISO;
  nightEnd: TDateTimeISO;
  night: TDateTimeISO;
  goldenHourEnd: TDateTimeISO;
  goldenHour: TDateTimeISO;
}

export interface SunPosition {
  azimuth: number;
  altitude: number;
}

export interface UvNow {
  result: {
    uv: number;
    uv_time: TDateTimeISO;
    uv_max: number;
    uv_max_time: TDateTimeISO;
    ozone: number;
    safe_exposure_time: SafeExposureTime;
    sun_info: SunInfo;
  };
}

export interface UvForecast {
  result: {
    uv: number;
    uv_time: TDateTimeISO;
    sun_position: SunPosition;
  }[];
}
