import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import LocationSelector from '../src/components/locations/LocationSelector';

const GoogleMap = () => {
  const mapRef = useRef(null);
  const apiKey = "Key"; // Introduce Google Maps API Key
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  
  const startLocations = [
    { lat: 10.407177593465775, lng: -84.59839543501047, title: 'Home' }
    // Puedes agregar más ubicaciones de inicio aquí
  ];
  const [startLocation, setStartLocation] = useState(startLocations[0]);
  const [endLocation, setEndLocation] = useState(null);

  const locations = [
    { lat: 10.359673447384159, lng: -84.50891916735758, title: 'Dexxos Market' },
    { lat: 10.360318801823219, lng: -84.47839663998458, title: 'Dexxos Market #2' },
    { lat: 10.341601136316857, lng: -84.43182868803281, title: 'Dexxos Market #3' },
    { lat: 10.472037747876174, lng: -84.64248155526514, title: 'Dexxos Market #4' },
    { lat: 10.484883653114148, lng: -84.49332495138447, title: 'Dexxos Market #5' },
    { lat: 10.423559847284999, lng: -84.51699825924837, title: 'Dexxos Market #6' },
  ];

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 10.429806343981681, lng: -84.46676465475667 },
          zoom: 11,
        });

        const icon = {
          url: 'https://cdn.discordapp.com/attachments/1138655103801360424/1269340245896462397/supermarket.png?ex=66afb4b9&is=66ae6339&hm=961585b991ad7ec90b8d2000f241e79b4b607822be8c3c8af2d5c78c29c25f89&', // URL of the supermarket icon
          scaledSize: new window.google.maps.Size(32, 32),
        };

        const houseIcon = {
          url: 'https://cdn-icons-png.flaticon.com/512/3203/3203071.png', // URL of the house icon
          scaledSize: new window.google.maps.Size(32, 32),
        };

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });

        directionsRenderer.setMap(map);

        let startMarker;
        const createStartMarker = () => {
          if (startMarker) {
            startMarker.setMap(null);
          }
          startMarker = new window.google.maps.Marker({
            position: startLocation,
            map: map,
            icon: houseIcon,
            title: 'Start Location',
          });
        };

        if (endLocation) {
          createStartMarker();
          directionsService.route(
            {
              origin: startLocation,
              destination: endLocation,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);

                const route = response.routes[0].legs[0];
                setDistance(route.distance.text);
                setDuration(route.duration.text);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            }
          );
        }

        locations.forEach(location => {
          const markerElement = document.createElement('div');
          markerElement.innerHTML = `
            <div style="position: relative; width: 32px; height: 32px;">
              <img src="${icon.url}" style="width: 100%; height: 100%;" alt="${location.title}">
            </div>
          `;

          const markerOptions = {
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title,
          };

          let marker;
          if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
            marker = new window.google.maps.marker.AdvancedMarkerElement({
              ...markerOptions,
              content: markerElement,
            });
          } else {
            marker = new window.google.maps.Marker({
              ...markerOptions,
              icon: icon,
            });
          }

          marker.addListener('click', () => {
            setEndLocation({ lat: location.lat, lng: location.lng });
          });
        });
      }
    }).catch(e => {
      console.error('Error loading Google Maps', e);
    });
  }, [apiKey, startLocation, endLocation]);

  return (
    <div>
      <LocationSelector 
        startLocations={startLocations} 
        endLocations={locations} 
        setStartLocation={setStartLocation} 
        setEndLocation={setEndLocation} 
      />
      <div ref={mapRef} style={{ width: '100%', height: '450px' }}></div>
      <div className="mt-4 p-4 bg-gray-100 rounded shadow-lg">
        <h2 className="text-xl font-semibold">Route Information</h2>
        <p className="mt-2">Distance: {distance}</p>
        <p>Duration: {duration}</p>
      </div>
    </div>
  );
};

export default GoogleMap;
