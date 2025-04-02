import React, { useState } from 'react';
import MapPage from './components/mappage.jsx';
import EventsPage from './components/EventsPage';

function App() {
  const [page, setPage] = useState('map');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
    {/* Fixed Header */}
        <header className="bg-[#800000] fixed top-0 left-0 w-full shadow py-6 px-8 flex justify-between items-center z-50">
          <h1 className="text-2xl sm:text-4xl font-bold text-white">UChicago Hub</h1>
          {/* Mobile Hamburger Menu (visible on small screens) */}
        <div className="sm:hidden">
          <button onClick={handleMenuToggle} className="text-white focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {/* Desktop Navigation */}
        <nav className=" text-white hidden sm:flex space-x-6">
          <button onClick={() => setPage('map')} className="hover:underline focus:outline-none">
            Map
          </button>
          <button 
            onClick={() => setPage('events')} 
            className="text-lg text-white hover:underline focus:outline-none transition duration-200">
            Events
          </button>
        </nav>
      </header>
      
      {/* Mobile Menu (visible when hamburger is toggled) */}
      {menuOpen && (
        <div className="sm:hidden fixed top-25 left-0 w-full z-40 shadow">
          <nav className="flex flex-col">
            <button
              onClick={() => { setPage('map'); setMenuOpen(false); }}
              className="px-4 py-30 text-white hover:bg-[#660000]"
            >
              Map
            </button>
            <button
              onClick={() => { setPage('events'); setMenuOpen(false); }}
              className="px-4 py-30 text-white hover:bg-[#660000]"
            >
              Events
            </button>
          </nav>
        </div>
      )}
      
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
