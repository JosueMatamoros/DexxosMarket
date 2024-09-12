import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { motion } from "framer-motion";
import { Card } from "flowbite-react";
import { useThemeMode } from "flowbite-react";
import { useTranslation } from "react-i18next";

const GoogleMap = () => {
  const mapRef = useRef(null);
  const apiKey = "AIzaSyBcBRXKY0uS-qh5fBxHvIUcsie3oi7RNKU";
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const { mode } = useThemeMode();
  const { t } = useTranslation(); // Hook de i18next para traducciones

  const initialCenter = { lat: 10.429806343981681, lng: -84.46676465475667 }; // Coordenadas iniciales

  const locations = [
    {
      lat: 10.359673447384159,
      lng: -84.50891916735758,
      title: "Dexxos Market",
    },
    {
      lat: 10.360318801823219,
      lng: -84.47839663998458,
      title: "Dexxos Market #2",
    },
    {
      lat: 10.341601136316857,
      lng: -84.43182868803281,
      title: "Dexxos Market #3",
    },
    {
      lat: 10.472037747876174,
      lng: -84.64248155526514,
      title: "Dexxos Market #4",
    },
    {
      lat: 10.484883653114148,
      lng: -84.49332495138447,
      title: "Dexxos Market #5",
    },
    {
      lat: 10.423559847284999,
      lng: -84.51699825924837,
      title: "Dexxos Market #6",
    },
  ];

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        if (mapRef.current) {
          const mapInstance = new window.google.maps.Map(mapRef.current, {
            center: initialCenter,
            zoom: 11,
          });
          setMap(mapInstance);

          const directionsServiceInstance =
            new window.google.maps.DirectionsService();
          const directionsRendererInstance =
            new window.google.maps.DirectionsRenderer({
              suppressMarkers: true,
            });

          directionsRendererInstance.setMap(mapInstance);
          setDirectionsService(directionsServiceInstance);
          setDirectionsRenderer(directionsRendererInstance);

          const icon = {
            url: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
            scaledSize: new window.google.maps.Size(32, 32),
          };

          locations.forEach((location) => {
            const marker = new window.google.maps.Marker({
              position: { lat: location.lat, lng: location.lng },
              map: mapInstance,
              title: location.title,
              icon: icon,
            });

            marker.addListener("click", () => {
              setEndLocation(location);
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentLocation = {
                      lat: latitude,
                      lng: longitude,
                      title: t("googleMap.currentLocation"),
                    };
                    setStartLocation(currentLocation);

                    new window.google.maps.Marker({
                      position: currentLocation,
                      map: mapInstance,
                      icon: {
                        url: "https://cdn-icons-png.flaticon.com/512/3203/3203071.png",
                        scaledSize: new window.google.maps.Size(32, 32),
                      },
                      title: t("googleMap.currentLocation"),
                    });

                    directionsServiceInstance.route(
                      {
                        origin: currentLocation,
                        destination: { lat: location.lat, lng: location.lng },
                        travelMode: window.google.maps.TravelMode.DRIVING,
                      },
                      (response, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                          directionsRendererInstance.setDirections(response);

                          const route = response.routes[0].legs[0];
                          setDistance(route.distance.text);
                          setDuration(route.duration.text);
                        } else {
                          window.alert(
                            "Directions request failed due to " + status
                          );
                        }
                      }
                    );
                  },
                  (error) => {
                    console.error("Error obtaining location", error);
                  },
                  { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
              }
            });
          });
        }
      })
      .catch((e) => {
        console.error("Error loading Google Maps", e);
      });
  }, [apiKey, t]);

  const openGoogleMaps = () => {
    if (startLocation && endLocation) {
      const origin = `${startLocation.lat},${startLocation.lng}`;
      const destination = `${endLocation.lat},${endLocation.lng}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      window.open(url, "_blank");
    }
  };

  const allDataAvailable = distance && duration && startLocation && endLocation;

  const handleLocationClick = (location) => {
    if (!map || !directionsService || !directionsRenderer) return;

    setEndLocation(location);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = {
            lat: latitude,
            lng: longitude,
            title: t("googleMap.currentLocation"),
          };
          setStartLocation(currentLocation);

          new window.google.maps.Marker({
            position: currentLocation,
            map: map,
            icon: {
              url: "https://cdn-icons-png.flaticon.com/512/3203/3203071.png",
              scaledSize: new window.google.maps.Size(32, 32),
            },
            title: t("googleMap.currentLocation"),
          });

          directionsService.route(
            {
              origin: currentLocation,
              destination: { lat: location.lat, lng: location.lng },
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);

                const route = response.routes[0].legs[0];
                setDistance(route.distance.text);
                setDuration(route.duration.text);
              } else {
                window.alert("Directions request failed due to " + status);
              }
            }
          );
        },
        (error) => {
          console.error("Error obtaining location", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }

    map.setCenter({ lat: location.lat, lng: location.lng });
    map.setZoom(15);
  };

  return (
    <div className="w-screen mx-auto">
      {/* Mostrar este fragmento solo en pantallas menores a lg */}
      {allDataAvailable && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row space-x-4 mt-4 lg:hidden"
        >
          <div className="shadow-md rounded-lg flex-shrink-0 p-4">
            <h4 className="text-lg font-semibold">{t('googleMap.distance')}</h4>
            <div className="text-2xl font-medium">
              <span id="distance">{distance}</span>
            </div>
            <h4 className="text-lg font-semibold mt-4">{t('googleMap.eta')}</h4>
            <div className="text-2xl font-medium">
              <span id="eta">{duration}</span>
            </div>
          </div>

          <div className="shadow-md rounded-lg flex-shrink-0 p-4">
            <h4 className="text-lg font-semibold">{t('googleMap.departure')}</h4>
            <div className="text-2xl font-medium">
              <span id="departure">{t('googleMap.currentLocation')}</span>
            </div>
            <h4 className="text-lg font-semibold mt-4">{t('googleMap.arrival')}</h4>
            <div className="text-2xl font-medium">
              <span id="arrival">{endLocation.title}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex" style={{ height: "calc(100vh - 60px)" }}>
        <div className="flex-1">
          <div ref={mapRef} className="h-full w-full"></div>
        </div>
        {/* Sidebar: Solo visible en pantallas grandes (lg o mayores) */}
        <Card className="hidden lg:block w-1/4 border-0 rounded-none transition-colors duration-500 ease-in-out">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">DEXXOS MARKET</h5>
          {allDataAvailable && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t('googleMap.routeInfo')}
              </div>
              <div className="flex justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('googleMap.distance')}</h4>
                <div className="text-xl font-medium text-gray-900 dark:text-white">
                  <span id="distance ">{distance}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('googleMap.eta')}</h4>
                <div className="text-xl font-medium text-gray-900 dark:text-white">
                  <span id="eta ">{duration}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('googleMap.departure')}</h4>
                <div className="text-xl font-medium text-gray-900 dark:text-white">
                  <span id="departure">{t('googleMap.currentLocation')}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('googleMap.arrival')}</h4>
                <div className="text-xl font-medium text-gray-900 dark:text-white">
                  <span id="arrival">{endLocation.title}</span>
                </div>
              </div>
            </motion.div>
          )}
          <h4 className="text-2xl font-semibold mt-8 text-gray-900 dark:text-white">{t('googleMap.stores')}</h4>
          <div className="space-y-4">
            {locations.map((location) => (
              <button
                key={location.title}
                onClick={() => handleLocationClick(location)}
                className={`flex items-center justify-between w-full p-2 border border-gray-300 rounded-full transition text-gray-700 px-4 ${
                  mode === "dark" ? "" : "hover:bg-gray-100"
                }`}
              >
                <span className="text-gray-900 dark:text-white">{location.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
          </div>
          {/* Botón para abrir Google Maps */}
          <button
            onClick={openGoogleMaps}
            className="mt-8 w-full px-4 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {t('googleMap.openGoogleMaps')}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default GoogleMap;
