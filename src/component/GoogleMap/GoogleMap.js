import React from "react";
import { withGoogleMap, Marker } from "react-google-maps";

const GoogleMap = withGoogleMap((props) => (
  <GoogleMap defaultZoom={9} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
  </GoogleMap>
));
export default GoogleMap;
