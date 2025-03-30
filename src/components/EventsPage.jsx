import React, { useEffect, useState } from 'react';

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // fetch events from your backend
    fetch('http://localhost:3001/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {events.length === 0 && <p className="text-gray-600">No upcoming events.</p>}
      {events.map((event, index) => (
        <div key={index} className="border rounded-lg p-4 my-2 shadow-sm">
          <img src={event.imageUrl} alt="Event" className="w-full rounded-md mb-2" />
          <h2 className="text-xl font-bold mb-1">{event.eventName}</h2>
          <p className="text-gray-700">{event.caption}</p>
          <p className="text-gray-500 text-sm">
            {new Date(event.eventDate).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EventsPage;