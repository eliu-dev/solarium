import { useState } from 'react';
import { UvForecast } from '../../../entities/UvStatus';
import { UvForecastTable } from './UvForecastTable';
import { UvInputFields } from './UvInputFields';
import { Box } from '@mui/material';

export function UvDashboard() {
  const [uvForecast, setUvForecast] = useState<UvForecast>({ result: [] });

  function handleForecastUpdate(forecast: UvForecast) {
    setUvForecast(forecast);
  }

  return (
    <>
      <Box>
        <UvInputFields onForecastUpdate={handleForecastUpdate} />
        <UvForecastTable uvForecast={uvForecast} />
      </Box>
    </>
  );
}
