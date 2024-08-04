import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { motion } from "framer-motion";
import { Label, Card } from "flowbite-react";

const GoogleMap = () => {
  const mapRef = useRef(null);
  const apiKey = "AIzaSyBcBRXKY0uS-qh5fBxHvIUcsie3oi7RNKU"; // Introduce Google Maps API Key
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

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
            url: "https://cdn.discordapp.com/attachments/1138655103801360424/1269340245896462397/supermarket.png?ex=66afb4b9&is=66ae6339&hm=961585b991ad7ec90b8d2000f241e79b4b607822be8c3c8af2d5c78c29c25f89&", // URL of the supermarket icon
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
                      title: "Current Location",
                    };
                    setStartLocation(currentLocation);

                    new window.google.maps.Marker({
                      position: currentLocation,
                      map: mapInstance,
                      icon: {
                        url: "https://cdn-icons-png.flaticon.com/512/3203/3203071.png",
                        scaledSize: new window.google.maps.Size(32, 32),
                      },
                      title: "Current Location",
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
  }, [apiKey]);

  const allDataAvailable = distance && duration && startLocation && endLocation;

  return (
    <div className="w-4/5 mx-auto p-5">
      <div className="text-2xl font-semibold mb-4">Route Information</div>
    
      {allDataAvailable && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row space-x-4 mt-4"
        >
          <div className="shadow-md rounded-lg flex-shrink-0 p-4">
            <h4 className="text-lg font-semibold">Distance</h4>
            <div className="text-2xl font-medium">
              <span id="distance">{distance}</span>
            </div>
            <h4 className="text-lg font-semibold mt-4">ETA</h4>
            <div className="text-2xl font-medium">
              <span id="eta">{duration}</span>
            </div>
          </div>

          <div className="shadow-md rounded-lg flex-shrink-0 p-4">
            <h4 className="text-lg font-semibold">Departure</h4>
            <div className="text-2xl font-medium">
              <span id="departure">Current Location</span>
            </div>
            <h4 className="text-lg font-semibold mt-4">Arrival</h4>
            <div className="text-2xl font-medium">
              <span id="arrival">{endLocation.title}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div
        ref={mapRef}
        style={{ width: "100%", height: "450px", marginTop: "20px" }}
      ></div>
    </div>
  );
};

export default GoogleMap;
