import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

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

// An array of locations (cafés, dining halls, etc.)
const locations = [
  {
    name: "Baker Dining Hall",
    position: { lat: 41.79451588124671, lng: -87.59902228803362 },
  },
  {
    name: "Bartlett Dining Hall",
    position: { lat: 41.792131851073485, lng: -87.59824251722922},
  },
  {
    name: "Cathey Dining Hall",
    position: { lat: 41.785463993599784, lng: -87.60010858996223},
  },
  // Add more locations as needed
];

const MapPage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap 
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}  // Adjust zoom level as needed
      options={options}
    >
      {locations.map((location) => (
        <Marker
          key={location.name}
          position={location.position}
          title={location.name}
        />
      ))}
    </GoogleMap>
  );
};

export default MapPage;
