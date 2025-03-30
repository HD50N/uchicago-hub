import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = { lat: 41.7886, lng: -87.5987 };

const GOOGLE_MAPS_API_KEY = 'AIzaSyAlKrahXvremjpKS-x68Bwx_3evApN97RA';

// Expanded campus bounds for a broader view.
const campusBounds = {
  north: 41.80,
  south: 41.78,
  east: -87.57,
  west: -87.62,
};

const options = {
  restriction: {
    latLngBounds: {
      north: campusBounds.north,
      south: campusBounds.south,
      east: campusBounds.east,
      west: campusBounds.west,
    },
    strictBounds: true,
  },
};

// Define custom icon shapes for each category. 
const iconShapes = {
  diningHall: {
    path: "M -6 -6 L 6 -6 L 6 6 L -6 6 Z", 
    fillColor: '#FF0000',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 1.5,
  },
  cafe: {
    // Built-in circle for cafes
    path: window.google ? window.google.maps.SymbolPath.CIRCLE : "",
    fillColor: '#FF0000',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 10,
  },
  gym: {
    path: "M 0 -6 L 6 6 L -6 6 Z",
    fillColor: '#FF0000',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 2,
  },
  library: {
    // Star for libraries
    path: "M 0 -7 L 2 -2 L 7 -2 L 3 1 L 4 6 L 0 3 L -4 6 L -3 1 L -7 -2 L -2 -2 Z",
    fillColor: '#FF0000',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 2,
  },
};

const locations = [
  {
    name: "Baker Dining Hall",
    type: "diningHall",
    position: { lat: 41.79451588124671, lng: -87.59902228803362 },
    hours:
      "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 2:30 PM\nSunday: 8:00 AM – 8:30 PM",
  },
  {
    name: "Bartlett Dining Hall",
    type: "diningHall",
    position: { lat: 41.792131851073485, lng: -87.59824251722922 },
    hours:
      "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 8:30 PM\nSunday: 8:00 AM – 8:30 PM",
  },
  {
    name: "Cathey Dining Hall",
    type: "diningHall",
    position: { lat: 41.785463993599784, lng: -87.60010858996223 },
    hours:
      "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 2:30 PM\nSunday: 8:00 AM – 8:30 PM",
  },
  {
    name: "Pret A Manger",
    type: "cafe",
    position: { lat: 41.79474694143852, lng: -87.59734477633121 },
    hours:
      "Monday to Friday: 8:00 AM – 11:00 PM\nSaturday to Sunday: 9:00 AM – 11:00 PM",
  },
  {
    name: "Ratner Athletics Center",
    type: "gym",
    position: { lat: 41.79424627282975, lng: -87.60168938877143 },
    hours: "Open 24/7",
  },
  {
    name: "Regenstein Library",
    type: "library",
    position: { lat: 41.7888, lng: -87.5989 },
    hours: "Monday to Friday: 8:00 AM – 10:00 PM\nWeekend: 9:00 AM – 6:00 PM",
  },
];

const MapPage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;
  
  return (
    <GoogleMap 
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}
      options={options}
    >
      {locations.map((location) => (
        <React.Fragment key={location.name}>
          <Marker
            position={location.position}
            title={location.name}
            icon={iconShapes[location.type]}
            onClick={() => {
              console.log('Marker clicked:', location);
              setSelectedLocation(location);
            }}
          />
          {/* Draw a circular perimeter around each location */}
          <Circle
            center={location.position}
            radius={50}  // radius in meters; adjust as needed
            options={{
              fillColor: '#ffcccc',
              fillOpacity: 0.35,
              strokeColor: '#ff0000',
              strokeOpacity: 0.8,
              strokeWeight: 1,
            }}
          />
        </React.Fragment>
      ))}
      
      {selectedLocation && (
        <InfoWindow
          position={selectedLocation.position}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div className="text-black bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
            <pre className="text-sm whitespace-pre-wrap mt-2">{selectedLocation.hours}</pre>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapPage;
