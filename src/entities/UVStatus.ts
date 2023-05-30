type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;
type TDateISODate = `${TYear}-${TMonth}-${TDay}`;
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;

type UVRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface UVStatus {
  uv: UVRange;
  uv_time: TDateISO;
  uv_max: number;
  uv_max_time: TDateISO;
  ozone: number;
  ozone_time: TDateISO;
  safe_exposure_time: SkinTypeExposureRange;
}

export interface SkinTypeExposureRange {
  st1: number;
  st2: number;
  st3: number;
  st4: number;
  st5: number;
  st6: number;
}
