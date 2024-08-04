import React from 'react';
import { Select } from 'flowbite-react';

const LocationSelector = ({ startLocations, endLocations, setStartLocation, setEndLocation }) => {
  const handleStartChange = (event) => {
    const selectedLocation = startLocations.find(location => location.title === event.target.value);
    if (selectedLocation) {
      setStartLocation({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    }
  };

  const handleEndChange = (event) => {
    const selectedLocation = endLocations.find(location => location.title === event.target.value);
    if (selectedLocation) {
      setEndLocation({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-lg mb-4">
      <div className="mb-4">
        <label htmlFor="start-location" className="block text-sm font-medium text-gray-700">Start Location</label>
        <Select id="start-location" onChange={handleStartChange}>
          {startLocations.map(location => (
            <option key={location.title} value={location.title}>{location.title}</option>
          ))}
        </Select>
      </div>
      <div>
        <label htmlFor="end-location" className="block text-sm font-medium text-gray-700">End Location</label>
        <Select id="end-location" onChange={handleEndChange}>
          {endLocations.map(location => (
            <option key={location.title} value={location.title}>{location.title}</option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LocationSelector;
