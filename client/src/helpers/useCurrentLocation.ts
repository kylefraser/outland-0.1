import { useEffect, useState } from 'react';

const useCurrentLocation = (options = {}) => {
  // store location in state
  const [location, setLocation] = useState({});
  // store error message in state
  const [error, setError] = useState({});

  type SuccessProps = {
    coords: { latitude: number; longitude: number };
  };

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = (pos: SuccessProps) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's `getCurrentPosition` method
  const handleError = (error: { message: string }) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // If the geolocation is not defined in the used browser we handle it as an error
    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    // Call Geolocation API
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};

export default useCurrentLocation;
