import React, {useMemo} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loading from "./loading/loading";
import "../../styles/map.css";

const Map = () => {
    const position = useMemo(() => {
        return { lat: 26.24165250264531, lng: -81.77066154775633 };
        }, []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

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
          />
        </GoogleMap>
      )}
    </>
  );
};

export default Map;

//26.24165250264531, -81.77066154775633
