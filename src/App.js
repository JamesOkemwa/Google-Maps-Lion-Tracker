import React from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns'
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles'
import dotenv from 'dotenv'
import { useState, useCallback, useRef } from 'react'
import usePLacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'

function App() {
    const libraries = ['places'];
    const mapContainerStyle = {
        width: '100vw',
        height: '100vh'
    };
    const center = {
        lat: -1.2884,
        lng: 36.8233
    };
    const options={
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl : true
    }

    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    const [markers, setMarkers] = useState([]);

    const [selected, setSelected] = useState(null); //Stores the current selected marker that a user wants to see details for

    const onMapClick = useCallback((event) => {
        setMarkers((current) => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
        }])
    }, []) //This function wont change in between re-renders

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    if(loadError) return "Error loading Maps";
    if(!isLoaded) return "Loading Maps"

  return (
      <div>
          <h1>
              Lions{" "}
              <span role="img" aria-label='tent'>🦁 </span> 
            </h1>

            {/* <Search /> */}
          <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={8} 
            center={center} 
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
        > 
            {markers.map(marker => <Marker 
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng}}
                icon={{
                    url: './lion.svg',
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15, 15), //Anchor set at the middle of the icon size
                }}
                onClick={() => {
                    setSelected(marker);
                }}
            />)}

            {selected ? (<InfoWindow 
                position={{ lat: selected.lat, lng: selected.lng}}
                onCloseClick={() => {
                    setSelected(null)
                }}
            >
                    <div>
                        <h2>Lion Spotted!</h2>
                        <p>Spotted {formatRelative(selected.time, new Date())}</p>
                    </div>
            </InfoWindow>) : null }
          </GoogleMap>
      </div>
  )
}

export default App;
