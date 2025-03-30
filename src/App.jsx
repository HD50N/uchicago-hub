import React, { useState } from 'react';
import MapPage from './components/mappage.jsx';
import EventsPage from './components/EventsPage';

function App() {
    const [page, setPage] = useState('map');
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-[#800000] shadow py-6 px-8 flex justify-between items-center">
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
            {/* Remove additional padding when rendering the map */}
            <main className="flex-grow">
                {page === 'map' && (
                    <div className="w-full h-full">
                        <MapPage />
                    </div>
                )}
                {page === 'events' && (
                    <div className="container mx-auto p-8 h-full">
                        <EventsPage />
                    </div>
                )}
            </main>
            <footer className="bg-[#800000] py-4 text-center text-sm text-white">
                &copy; 2025 UChicago Hub. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
