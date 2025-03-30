import React, { useState } from 'react';
import MapPage from './components/mappage.jsx';
import EventsPage from './components/EventsPage';

function App() {
  const [page, setPage] = useState('map');

  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      {/* Fixed Header */}
      <header className="bg-[#800000] fixed top-0 left-0 w-full shadow py-6 px-8 flex justify-between items-center z-50">
        <h1 className="text-4xl font-bold text-white">UChicago Hub</h1>
        <nav className="space-x-6">
          <button onClick={() => setPage('map')} className="hover:underline focus:outline-none">
            Map
          </button>
          <button 
            onClick={() => setPage('events')} 
            className="text-lg text-white hover:text-gray-200 focus:outline-none transition duration-200">
            Events
          </button>
        </nav>
      </header>
      
      {/* Main Content with padding for header and footer */}
      <main className="flex-grow pt-24 pb-16">
        {page === 'map' && <MapPage />}
        {page === 'events' && (
          <div className="container mx-auto p-8">
            <EventsPage />
          </div>
        )}
      </main>
      
      {/* Fixed Footer */}
      <footer className="bg-[#800000] fixed bottom-0 left-0 w-full py-4 text-center text-sm text-white z-50">
        &copy; 2025 UChicago Hub. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
