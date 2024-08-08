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
      uv_time: '2024-01-01T00:00:00.000Z',
      sun_position: { azimuth: 0, altitude: 0 },
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
