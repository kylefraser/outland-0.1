import { useEffect, useRef, useState } from 'react';

const useWatchLocation = (options = {}) => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState({});
  const locationWatchId = useRef<number | null>(null);

  type SuccessProps = {
    coords: { latitude: number; longitude: number };
  };

  const handleSuccess = (pos: SuccessProps) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error: { message: string }) => {
    setError(error.message);
  };

  const cancelLocationWatch = () => {
    const { geolocation } = navigator;

    if (locationWatchId.current && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    return cancelLocationWatch;
  }, [options]);

  return { location, cancelLocationWatch, error };
};

export default useWatchLocation;
