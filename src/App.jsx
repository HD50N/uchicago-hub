import React, { useState } from 'react';
// import MapPage from './components/mappage.jsx';
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
            <main className="flex-grow container mx-auto p-8">
                {page === 'map' && <MapPage />}
                {page === 'events' && <EventsPage />}
            </main>
            <footer className="bg-[#800000] py-4 text-center text-sm text-white">
                &copy; 2025 UChicago Hub. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
