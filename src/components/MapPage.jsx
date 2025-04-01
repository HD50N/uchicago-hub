import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';

const center = { lat: 41.7886, lng: -87.5987 };

const GOOGLE_MAPS_API_KEY = 'AIzaSyAlKrahXvremjpKS-x68Bwx_3evApN97RA';

const campusBounds = {
  north: 41.80,
  south: 41.78,
  east: -87.57,
  west: -87.62,
};

const options = {
  restriction: {
    latLngBounds: campusBounds,
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
    path: "M 0 -6 L 6 0 L 0 6 L -6 0 Z", // Diamond shape
    fillColor: '#FF0000',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 2,
  },
  gym: {
    path: "M 0 -6 L 6 6 L -6 6 Z",
    fillColor: '#FF0000',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 2,
  },
  library: {
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
    hours: "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 2:30 PM\nSunday: 8:00 AM – 8:30 PM",
  },
  {
    name: "Bartlett Dining Hall",
    type: "diningHall",
    position: { lat: 41.792131851073485, lng: -87.59824251722922 },
    hours: "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 8:30 PM\nSunday: 8:00 AM – 8:30 PM",
  },
  {
    name: "Cathey Dining Hall",
    type: "diningHall",
    position: { lat: 41.785463993599784, lng: -87.60010858996223 },
    hours: "Monday to Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 2:30 PM\nSunday: 8:00 AM – 8:30 PM",
  },
  {
    name: "Pret A Manger",
    type: "cafe",
    position: { lat: 41.79116402809895, lng: -87.59825730062151 },
    hours: "Monday to Friday: 8:00 AM – 11:00 PM\nSaturday to Sunday: 9:00 AM – 11:00 PM",
  },
  {
    name: "Ratner Athletics Center",
    type: "gym",
    position: { lat: 41.79424627282975, lng: -87.60168938877143 },
    hours: "Monday–Friday: 6:00 AM – 11:00 PM\nSaturday–Sunday: 8:00 AM – 8:00 PM",
  },
  {
    name: "Regenstein Library",
    type: "library",
    position: { lat: 41.79244165496006, lng: -87.6000300608699 },
    hours: "Monday to Friday: 8:00 AM – 12:00AM\nWeekend: 9:00 AM – 6:00 PM",
  },
  {
    name: "Peach's Cafe",
    type: "cafe",
    position: { lat: 41.790255404563005, lng: -87.6025169517084 },
    hours: "Monday to Friday: 8:30 AM – 6:00 PM\nWeekend: Closed",
  },
  {
    name: "Woodlawn Dining Commons",
    type: "diningHall",
    position: { lat: 41.78491217087897, lng: -87.5971092031982 },
    hours: "Monday–Friday: 7:00 AM – 8:30 PM\nSaturday: 8:00 AM – 8:30 PM\nSunday: 8:00 AM – 8:30 PM",
  },
  {
    name: "Café Logan",
    type: "cafe",
    position: { lat: 41.785814569205, lng: -87.60358571854229 },
    hours: "Monday–Friday: 8:00 AM – 8:00 PM\nSaturday: 12:00 PM – 6:00 PM\nSunday: 12:00 PM – 4:00 PM",
  },
  {
    name: "Gordon Café",
    type: "cafe",
    position: { lat: 41.79138765842514, lng: -87.6024581455257 },
    hours: "Monday–Friday: 8:00 AM – 3:00 PM",
  },
  {
    name: "The John Crerar Library",
    type: "library",
    position: { lat: 41.79055374217177, lng: -87.60284713544243 },
    hours: "Monday–Friday: 9:00 AM – 8:00 PM\nSaturday: 12:00 PM – 6:00 PM\nSunday: 12:00 PM – 8:00 PM",
  },
  {
    name: "Eckhart Library",
    type: "library",
    position: { lat: 41.79045094500869, lng: -87.5984481725094 },
    hours: "Monday–Thursday: 9:00 AM – 6:00 PM\nFriday: 9:00 AM – 5:00 PM\nSaturday–Sunday: Closed",
  },
  {
    name: "The D'Angelo Law Library",
    type: "library",
    position: { lat: 41.78522597047447, lng: -87.59907527436204 },
    hours: "Monday–Friday: 8:00 AM – 5:00 PM\nSaturday: 10:00 AM – 6:00 PM\nSunday: 12:00 PM – 8:00 PM",
  },
  {
    name: "Harper Memorial Library",
    type: "library",
    position: { lat: 41.78822649144354, lng: -87.59930988278919 },
    hours: "Monday–Friday: 8:00 AM – 11:00 PM\nWeekends: 10:00 AM – 11:00 PM",
  },
  {
    name: "Henry Crown Field House",
    type: "gym",
    position: { lat: 41.79364216735315, lng: -87.59831234234596 },
    hours: "Monday–Thursday: 8:00 AM – 10:30 PM\nFriday: 8:00 AM – 8:00 PM\nWeekends: 10:00 AM – 8:00 PM",
  },
  {
    name: "Joe and Rika Mansueto Library",
    type: "library",
    position: { lat: 41.79200267741494, lng: -87.60086963537731 },
    hours: "Monday–Thursday: 8:00 AM – 11:45 PM\nFriday: 8:00 AM – 10:45 PM\nSaturday: 9:00 AM – 10:45 PM\nSunday: 9:00 AM – 11:45 PM",
  },
  {
    name: "Hallowed Grounds",
    type: "cafe",
    position: { lat: 41.79153673992743, lng: -87.59840513388625 },
    hours: "Monday–Tuesday: 9:00 AM – 6:00 PM\nWednesday–Thursday: 9:00 AM – 6:00 PM\nFriday: 9:00 AM – 8:00 PM\n Saturday: 12:00 PM – 5:30 PM \n Sunday: 12:00 PM – 9:00 PM",
  },
  {
    name: "Quantum Café",
    type: "cafe",
    position: { lat: 41.792093160245024, lng:-87.60160728970601 },
    hours: "Monday–Friday: 8:00 AM – 3:00 PM\nWeekends: Closed",
  },
  {
    name: "Chicago French Press",
    type: "cafe",
    position: { lat: 41.78983108951925, lng: -87.60165563805522 },
    hours: "Sunday: 9:00 AM – 6:00 PM\nMonday–Friday: 8:00 AM – 6:00 PM\nSaturday: 9:00 AM – 6:00 PM",
  },
  {
    name: "Harris Café",
    type: "cafe",
    position: { lat: 41.78632405951091, lng: -87.59434056087017 },
    hours: "Sunday: Closed\nMonday–Thursday: 8:00 AM – 3:00 PM\nFriday: Closed\nSaturday: Closed",
  },
  {
    name: "Press Café",
    type: "cafe",
    position: { lat: 41.78585666931969, lng: -87.59025438785382 },
    hours: "Tuesday–Thursday: 8:00 AM – 3:00 PM\nFriday–Monday: Closed",
  },
  {
    name: "Ex Libris Café",
    type: "cafe",
    position: { lat: 41.79230036087264, lng: -87.59993370319779 },
    hours: "Monday–Thursday: 9:00 AM – 10:30 PM\nFriday: 9:00 AM – 5:00 PM\nSaturday: 11:00 AM – 5:00 PM\nSunday: 11:00 AM – 10:30 PM",
  },
  {
    name: "Cobb Coffee Shop",
    type: "cafe",
    position: { lat: 41.78905276747173, lng: -87.60101597621426 },
    hours: "Monday–Friday: 9:00 AM – 4:00 PM\nSaturday–Sunday: Closed",
  },
  {
    name: "Harper Café",
    type: "cafe",
    position: { lat: 41.78818315883878, lng: -87.5994518571653 },
    hours: "Monday–Thursday: 9:00 AM – 6:00 PM\nFriday: 8:30 AM – 5:00 PM\nSaturday: Closed\nSunday: 12:00 PM – 5:00 PM",
  },
  {
    name: "Grounds of Being",
    type: "cafe",
    position: { lat: 41.788990472681924, lng: -87.59997500980577 },
    hours: "Monday–Friday: 7:45 AM – 4:00 PM\n Weekends: Closed",
  },
  {
    name: "Capriotti's at Midway Café",
    type: "cafe",
    position: { lat: 41.784844481653394, lng: -87.60086305383382 },
    hours: "Sunday–Thursday: 11:00 AM – 11:00 PM",
  },
];

const LocationMarker = ({ location, onClick }) => (
  <>
    <Marker
      position={location.position}
      title={location.name}
      icon={iconShapes[location.type]}
      onClick={onClick}
    />
    <Circle
      center={location.position}
      radius={50} // adjust the radius (meters) as needed
      options={{
        fillColor: '#ffcccc',
        fillOpacity: 0.35,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
      }}
    />
  </>
);

const MapPage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const handleGetLocation = () => {
    // Toggle location visibility if already set.
    if (userLocation) {
      setUserLocation(null);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser');
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={15}
        options={options}
      >
        {locations.map((location) => (
          <LocationMarker
            key={location.name}
            location={location}
            onClick={() => {
              console.log('Marker clicked:', location);
              setSelectedLocation(location);
            }}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="text-black bg-white p-4 rounded shadow-lg">
              <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
              <pre className="text-sm whitespace-pre-wrap mt-2">
                {selectedLocation.hours}
              </pre>
            </div>
          </InfoWindow>
        )}

        {/* Blue Marker for User Location */}
        {userLocation && (
          <Marker
            position={userLocation}
            title="My Location"
            icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          />
        )}
      </GoogleMap>
      {/* Top Left Overlay Below Navbar */}
      <div className="absolute top-35 left-4 z-50 flex flex-col space-y-2">
        <button
          onClick={handleGetLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
        >
          Get My Location
        </button>
        {userLocation && (
          <div className="bg-white p-4 rounded shadow border border-gray-200">
            <p className="font-semibold text-blue-400">Your Location:</p>
            <p className="text-sm text-blue-400">Latitude: {userLocation.lat.toFixed(4)}</p>
            <p className="text-sm text-blue-400">Longitude: {userLocation.lng.toFixed(4)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;