import React, { useState, useEffect } from "react";

function EventsPage() {
  const [animate, setAnimate] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    dateTime: "",
    organization: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 300); // DO NOT REMOVE THIS
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleCreateEvent = () => {
    console.log("Event Created:", eventData);
    setShowModal(false); // Close the modal after creating the event
    setEventData({ name: "", dateTime: "", organization: "" }); // Reset form
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start transition-all duration-300 ease-in-out ${
        animate ? "translate-y-[4rem] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Create Events Button */}
      <div
        className={`fixed top-12 right-1 bg-[#800000] text-white px-1 py-1 rounded shadow-lg transition-transform duration-500 translate-y-0 opacity-100 z-60`}
      >
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#800000] text-white text-lg font-semibold hover:shadow-xl px-2 py-1 rounded transition duration-500"
        >
          Create Event
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Events!
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Manage and explore all the UChicago events in one place.
        </p>
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
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 text-gray-700 rounded px-3 py-2 bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={eventData.dateTime}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={eventData.organization}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
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