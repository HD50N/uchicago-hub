import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker styles

function EventsPage() {
  const [animate, setAnimate] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    dateTime: "",
    organization: "",
    location: "", // Added location field
  });
  const [events, setEvents] = useState([]); // State to store created events
  const [filters, setFilters] = useState({
    name: "",
    organization: "",
    location: "",
  }); // State for filters
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    // Load events from localStorage when the component mounts
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      setEvents(parsedEvents); // Load all events into state
    }
  }, []); // Runs only once when the component mounts

  // Save events to localStorage whenever the events state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]); // Runs whenever the `events` state changes

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 300); // DO NOT REMOVE THIS
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Periodically check and remove events older than a day
    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.filter(
          (event) => new Date(event.dateTime) > new Date(new Date().setDate(new Date().getDate() - 1))
        )
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDateChange = (date) => {
    setEventData({ ...eventData, dateTime: date });
  };

  const handleCreateEvent = () => {
    const { name, dateTime, organization, location } = eventData;

    // Validation: Check if all fields are filled
    if (!name || !dateTime || !organization || !location) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validation: Check if the dateTime is in the future
    if (new Date(dateTime) <= new Date()) {
      setErrorMessage("The event time must be in the future.");
      return;
    }

    // If validation passes, create the event
    setEvents([...events, eventData]);
    setShowModal(false); // Close the modal
    setEventData({ name: "", dateTime: "", organization: "", location: "" }); // Reset form
    setErrorMessage(""); // Clear error message
  };

  const filteredEvents = events
    .filter((event) => new Date(event.dateTime) > new Date(new Date().setDate(new Date().getDate() - 1))) // Filter out past events dynamically
    .filter((event) => {
      return (
        event.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        event.organization.toLowerCase().includes(filters.organization.toLowerCase()) &&
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    });

  const formatDate = (dateString) => {
    const options = { 
      month: "long", 
      day: "numeric", 
      year: "numeric", 
      hour: "numeric", 
      minute: "numeric", 
      hour12: true 
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start transition-all duration-300 ease-in-out ${
        animate ? "translate-y-[4rem] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Header */}
      <div className="w-full p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Events!
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Manage and explore all the UChicago events in one place.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full p-0 flex flex-col md:flex-row">
        
        {/* Left Section */}
        <div className="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
        <p className="text-lg text-gray-600 mb-4">
        Explore and create your events effortlessly.
        <button
              onClick={() => setShowModal(true)}
              className="button-light-gray font-bold transition duration-500 w-full"
            >
              Create Event
            </button>
          </p>
          {/* Find Event Menu */}
          <div className="bg-gray-100 text-gray-600 p-4 rounded shadow-md">
          
            <h2 className="text-xl font-bold mb-4">Find Event</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Event Name</label>
              <input
                type="text"
                name="name"
                placeholder="Search by event name..."
                value={filters.name}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Organization</label>
              <input
                type="text"
                name="organization"
                placeholder="Search by organization..."
                value={filters.organization}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Search by location..."
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Use the fields above to filter events dynamically.
            </p>
          </div>
        </div>

        {/* Vertical Line */}
        <div className="hidden md:block w-[1px] bg-gray-300"></div>

        {/* Right Section (Events) */}
        <div className="flex-2 pl-0 md:pl-4 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <div key={index} className="square-block">
              <div>
                <h3 className="text-lg font-bold mb-2">{event.name}</h3>
                <p className="text-lg font-bold mb-2">_____________</p>
                <p className="text-xs text-left font-sm mb-1 ml-2">
                  Date: {formatDate(event.dateTime)}
                </p>
                <p className="text-xs text-left font-sm mb-1 ml-2">
                  Organization: {event.organization}
                </p>
                <p className="text-xs text-left ml-2">
                  Location: {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Gray Overlay */}
          <div className="bg-gray-800 bg-opacity-5 z-10"></div>

          {/* Modal Content */}
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
              showModal ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`bg-white rounded-lg shadow-lg p-6 w-96 transform transition-transform duration-500 ${
                showModal ? "scale-100" : "scale-95"
              }`}
            >
              <h2 className="text-2xl font-bold mb-4">Create Event</h2>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <div className="mb-4">
                <label className="block text-gray-800 font-bold mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                  className="w-full border border-gray-300 text-gray-700 rounded px-3 py-2 bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 font-bold mb-2">
                  Date and Time
                </label>
                <DatePicker
                  selected={eventData.dateTime ? new Date(eventData.dateTime) : null}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full border border-gray-300 text-gray-700 rounded px-3 py-2 bg-white"
                  placeholderText="Select date and time"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 font-bold mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={eventData.organization}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  className="w-full border border-gray-300 text-gray-700 rounded px-3 py-2 bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  className="w-full border border-gray-300 text-gray-700 rounded px-3 py-2 bg-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="button-light-gray"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="button-light-gray"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EventsPage;