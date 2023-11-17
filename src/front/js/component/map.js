import React, { useEffect, useState, useMemo, useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loading from "./loading/loading";
import { Context } from "../store/appContext";
import "../../styles/map.css";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({});
  const navigate = useNavigate()
  const [location, setLocation] = useState({});
  const [gyms, setGyms] = useState([])
  const { store, actions } = useContext(Context)
  const [search, setSearch] = useState('')
  const position = useMemo(() => {
    return { lat: 26.24165250264531, lng: -81.77066154775633 };
  }, []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    !store.token && navigate("/login")
    getPosition();
    const getGymsData = async () => {
      const gymsData = await actions.getGyms()
      setGyms(gymsData)      
    }
    getGymsData()
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
  //https://www.google.com/maps/search/gyms/@26.2410345,-81.7767835,13z/data=!3m1!4b1?entry=ttu
  const showPosition = (position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    //10.032883861747436, -69.2620370343719
    setCurrentPosition({
      lat: position.coords.latitude, //10.032883861747436, 
      lng: position.coords.longitude //-69.2620370343719
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

  const searchGyms = () => {    
      const searchOutside = confirm('Would you like to look in a third party app? "Make sure you allow pop-ups in your browser"')          
      if (searchOutside) {
        window.open(`https://www.google.com/maps/search/gyms/@${currentPosition.lat},${currentPosition.lng},13z/data=!3m1!4b1?entry=ttu`)
      } else {
        alert('Please allow location access for this site to work properly.')
      }     
      setSearch('') 
  }

  return (

    <>
      {!isLoaded ? (
        <Loading />
      ) : (
        <div className="container-fluid d-flex flex-column">
          <div className="row">
            <div className="container m-auto p-3">
              <span className="text-center text-vital-orange">Don't see any gyms afliate, try to search for gyms near you! in google map clicking<span className="text-vital-orange bold" onClick={searchGyms}> Here!!</span></span>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <span className="text-center text-vital-orange pb-3"> Current Location: {location.city}, {location.state}, {location.country}</span>
            </div>
          </div>
          <GoogleMap
            zoom={13}
            center={currentPosition}
            mapContainerClassName="map-style"
          >
            {
              store.gyms && store.gyms.map((gym, index) => {
                return (
                  <Marker
                    key={index}
                    position={{ lat: gym.latitude, lng: gym.longitude }}
                    title={gym.name}
                    label={gym.name}
                  />
                )
              }
              )
            }
            {/* <Marker
              position={{ lat: 26.24165250264531, lng: -81.77066154775633 }}
              title="Naples, FL"
              label="Naples, FL"
            /> */}
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
        </div>)}
    </>
  );
};

export default Map;

//26.24165250264531, -81.77066154775633
