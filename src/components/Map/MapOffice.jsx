import React from 'react'
import { GoogleMap, useJsApiLoader,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '70vw',
  height: '50vh',
  
};

const center = {
  lat:48.25898853013352,
  lng: 25.956481153965818
};

function MapOffice() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCk3eWqtwQDddcKGxI0bQ73gdiCcL5ltag"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return <div className=' flex items-center justify-center flex-col  '>
 
 { isLoaded===true ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat:48.26659945813064,lng:25.939732362574233}}
        zoom={14}
      
        onUnmount={onUnmount}
       
      >
        { /* Child components, such as markers, info windows, etc. */ }
        
        <div >
        <Marker position={{lat:48.26924824459138,lng: 25.923757203974443}} title='тц Проспект'  /> 
        
        <Marker position={{lat:48.25924596720751,lng:25.95679345477146 }}  title='тц Депот'/>
       
        </div>
      </GoogleMap>
  ) : <></>}
  </div>
}

export default React.memo(MapOffice)