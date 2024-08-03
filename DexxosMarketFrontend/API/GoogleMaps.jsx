import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = () => {
  const mapRef = useRef(null);
  const apiKey = "KEY"; // Introduce your Google Maps API key here

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      }
    });
  }, [apiKey]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default GoogleMap;
