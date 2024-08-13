import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { MyLocation, Search } from '@mui/icons-material';
import { UvForecast } from '../../../entities/UvStatus';

const geolocateUser = async (): Promise<GeolocationPosition | void> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Client does not support geolocation'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
      );
    }
  });
};

type UserLocation = {
  latitude: string; // geolocation API returns a number. However, we are using strings because updates to react state cause errors when users enter a minus sign for negative values
  longitude: string;
  latitudePresent: boolean;
  longitudePresent: boolean;
};

function checkValidNumber(value: string): boolean {
  const checkValidNumber: RegExp = /^-?\d*\.?\d*$/;
  return checkValidNumber.test(value);
}

export function UvInputFields({ onForecastUpdate }: { onForecastUpdate: (forecast: UvForecast) => void }) {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: '',
    longitude: '',
    latitudePresent: false,
    longitudePresent: false,
  });

  async function handleGeolocation(): Promise<void> {
    try {
      const location: GeolocationPosition | void = await geolocateUser();
      if (location !== undefined && location !== null) {
        setUserLocation({
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
          latitudePresent: true,
          longitudePresent: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleLatitudeUpdate(latitude: string) {
    if (checkValidNumber(latitude)) {
      setUserLocation((currentLocation) => ({
        ...currentLocation,
        latitude: latitude,
        latitudePresent: latitude.length > 0,
      }));
    }
  }

  function handleLongitudeUpdate(longitude: string) {
    if (checkValidNumber(longitude)) {
      setUserLocation((currentLocation) => ({
        ...currentLocation,
        longitude: longitude,
        longitudePresent: longitude.length > 0,
      }));
    }
  }

  async function handleGeolocationSubmit(e: React.FormEvent): Promise<UvForecast | void> {
    e.preventDefault();
    console.log(e.currentTarget);
    if (userLocation.latitudePresent && userLocation.longitudePresent) {
      const response = await fetch(
        `/uv-forecast-request?lat=${userLocation.latitude}&lng=${userLocation.longitude}&alt=0}`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const results: UvForecast = await response.json();
      console.log(results);
      onForecastUpdate(results);
      return results;
    } else {
      console.log(
        `Geolocation submission error: ${userLocation.latitudePresent === false ? 'Latitude missing. ' : ''} ${
          userLocation.longitudePresent === false ? 'Longitude missing.' : ''
        }`,
      );
    }
  }

  return (
    <>
      <div>
        <Box
          component="form"
          onSubmit={handleGeolocationSubmit}
          sx={{ '& > :not(style)': { m: 1, width: 'fit-content' } }}
        >
          <TextField
            label="Latitude"
            required
            margin="normal"
            variant="outlined"
            value={userLocation.latitude}
            onChange={(e) => handleLatitudeUpdate(e.target.value)}
            InputLabelProps={{
              shrink: userLocation.latitudePresent, // Input label does not automatically shrink if value is updated externally
            }}
          ></TextField>
          <TextField
            label="Longitude"
            required
            variant="outlined"
            margin="normal"
            value={userLocation.longitude}
            onChange={(e) => handleLongitudeUpdate(e.target.value)}
            InputLabelProps={{
              shrink: userLocation.longitudePresent, // Input label does not automatically shrink if value is updated externally
            }}
          ></TextField>
          <Button
            variant="text"
            onClick={handleGeolocation}
            startIcon={<MyLocation fontSize="small" />}
            sx={{ width: 'fit-content' }}
          >
            Use my location
          </Button>
          <Button
            variant="text"
            //onClick={handleSearch}
            type="submit"
            startIcon={<Search fontSize="small" />}
            sx={{ width: 'fit-content' }}
          >
            Search
          </Button>
        </Box>
      </div>
    </>
  );
}
