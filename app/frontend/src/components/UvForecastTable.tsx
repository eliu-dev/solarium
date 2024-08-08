import { UvForecast } from '../../../entities/UvStatus.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { green, yellow, orange, red, pink, deepPurple, blue, grey } from '@mui/material/colors';
// import { useState } from 'react';

type UvColorScale =
  | typeof greenShade
  | typeof yellowShade
  | typeof orangeShade
  | typeof redShade
  | typeof pinkShade
  | typeof deepPurpleShade
  | typeof blueShade
  | typeof greyShade;

const [greenShade, yellowShade, orangeShade, redShade, pinkShade, deepPurpleShade, blueShade, greyShade] = [
  green[700],
  yellow[700],
  orange[700],
  red[700],
  pink[700],
  deepPurple[700],
  blue[700],
  grey[700],
];

function getUvIndexColor(uvIndex: number): UvColorScale {
  if (uvIndex >= 11) {
    return blueShade;
  } else if (uvIndex === 10) {
    return deepPurpleShade;
  } else if (uvIndex === 9) {
    return pinkShade;
  } else if (uvIndex === 8) {
    return redShade;
  } else if (uvIndex >= 5) {
    return orangeShade;
  } else if (uvIndex >= 3) {
    return yellowShade;
  } else if (uvIndex >= 1) {
    return greenShade;
  } else {
    return greyShade;
  }
}

const defaultUvForecast: UvForecast = {
  result: [
    {
      uv: 0,
      uv_time: '2024-06-20T09:28:50.705Z',
      sun_position: { azimuth: -2.1330813002492697, altitude: -0.011736263235668598 },
    },
    {
      uv: 0.1845,
      uv_time: '2024-06-20T10:28:50.705Z',
      sun_position: { azimuth: -1.9695871488128527, altitude: 0.1646798280903534 },
    },
    {
      uv: 0.8061,
      uv_time: '2024-06-20T11:28:50.705Z',
      sun_position: { azimuth: -1.8157473682508611, altitude: 0.35334476331733516 },
    },
    {
      uv: 2.0687,
      uv_time: '2024-06-20T12:28:50.705Z',
      sun_position: { azimuth: -1.6613316543203165, altitude: 0.5493841899697619 },
    },
    {
      uv: 3.9431,
      uv_time: '2024-06-20T13:28:50.705Z',
      sun_position: { azimuth: -1.4916335983070734, altitude: 0.7481863391028922 },
    },
    {
      uv: 6.3808,
      uv_time: '2024-06-20T14:28:50.705Z',
      sun_position: { azimuth: -1.2796109071237778, altitude: 0.9436564426663137 },
    },
    {
      uv: 8.3523,
      uv_time: '2024-06-20T15:28:50.705Z',
      sun_position: { azimuth: -0.9635371250166279, altitude: 1.1233215692699194 },
    },
    {
      uv: 9.508,
      uv_time: '2024-06-20T16:28:50.705Z',
      sun_position: { azimuth: -0.4076492587458935, altitude: 1.2518127943516313 },
    },
    {
      uv: 9.508,
      uv_time: '2024-06-20T17:28:50.705Z',
      sun_position: { azimuth: 0.37952342730970406, altitude: 1.2547596334005673 },
    },
    {
      uv: 8.3523,
      uv_time: '2024-06-20T18:28:50.705Z',
      sun_position: { azimuth: 0.9476900802037206, altitude: 1.1295970979071144 },
    },
    {
      uv: 6.3808,
      uv_time: '2024-06-20T19:28:50.705Z',
      sun_position: { azimuth: 1.2699613485467824, altitude: 0.9510078313857698 },
    },
    {
      uv: 4.1373,
      uv_time: '2024-06-20T20:28:50.705Z',
      sun_position: { azimuth: 1.4845077667251279, altitude: 0.7558479810001695 },
    },
    {
      uv: 2.0687,
      uv_time: '2024-06-20T21:28:50.705Z',
      sun_position: { azimuth: 1.6552157066636357, altitude: 0.5570460867269876 },
    },
    {
      uv: 0.8061,
      uv_time: '2024-06-20T22:28:50.705Z',
      sun_position: { azimuth: 1.8099057883460028, altitude: 0.36081658952363876 },
    },
    {
      uv: 0.1845,
      uv_time: '2024-06-20T23:28:50.705Z',
      sun_position: { azimuth: 1.9635637241775463, altitude: 0.17178747218596063 },
    },
    {
      uv: 0,
      uv_time: '2024-06-21T00:28:50.705Z',
      sun_position: { azimuth: 2.126522170935143, altitude: -0.005196843508169262 },
    },
  ],
};

function UvForecastTable({ uvForecast }: { uvForecast: UvForecast }) {
  if (uvForecast.result.length == 0) {
    uvForecast = defaultUvForecast;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>UV Index</TableCell>
            <TableCell>Altitude</TableCell>
            <TableCell>Azimuth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uvForecast.result.map((reading) => (
            <tr>
              <TableCell>{new Date(reading.uv_time).toLocaleString()}</TableCell>
              <TableCell sx={{ backgroundColor: getUvIndexColor(Math.round(reading.uv)), textAlign: 'center' }}>
                {reading.uv}
              </TableCell>
              <TableCell>{reading.sun_position.altitude}</TableCell>
              <TableCell>{reading.sun_position.azimuth}</TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UvForecastTable;
