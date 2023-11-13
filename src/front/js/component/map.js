import React, {useEffect, useState, useMemo} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loading from "./loading/loading";
import "../../styles/map.css";

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [location, setLocation] = useState({});
    const position = useMemo(() => {
        return { lat: 26.24165250264531, lng: -81.77066154775633 };
        }, []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    getPosition();
  }
  , []);

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // const posError = () => {
  //   if (navigator.permissions) {
  //     navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
  //       if (result.state == 'denied') {
  //         alert('Please allow location access for this site to work properly.');
  //       }
  //     });
  //   }
  // }

  const showPosition = (position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
    convertToaddress(position.coords.latitude, position.coords.longitude)
  }

  const convertToaddress = (lat, lng) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
      .then(response => response.json())
      .then(data => getCity(data))
  }

  const getCity = (data) => {
    setLocation({ city: data.results[0].address_components[3].long_name, state: data.results[0].address_components[5].long_name, country: data.results[0].address_components[6].long_name });

    console.log(location.city, location.state, location.country)
  }

  console.log(isLoaded)

  return (
    
    <>
      {!isLoaded ? (
        <Loading />
      ) : (
        <GoogleMap
          zoom={15}
          center={position}
          mapContainerClassName="map-style"
        >
          <Marker
            position={{ lat: 26.24165250264531, lng: -81.77066154775633 }}
            title="Naples, FL"
            label="Naples, FL"
          />
          <Marker
            position={currentPosition}
            icon={{
              url: "https://lh3.googleusercontent.com/a/ACg8ocIlQV-vhcabeddDGe5FtKVKz15v28z9Yf2cPlPgJMKamcah=s288-c-no",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            
            
          />
        </GoogleMap>
      )}
    </>
  );
};

export default Map;

//26.24165250264531, -81.77066154775633
