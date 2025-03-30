// // server/server.js
// import express from 'express';
// import cors from 'cors';
// import { getAllEvents } from './scrape.js';

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Enable CORS so your React frontend can call this API.
// app.use(cors());
// app.use(express.json());

// // Store cached results to reduce API calls and scraping
// let cachedEvents = [];
// let lastFetchTime = null;
// const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// // Define the Instagram pages to scrape.
// const instagramPages = [
//   'https://www.instagram.com/uchicagokso/',
//   'https://www.instagram.com/hksa.uchicago/',
// ];

// // Helper to check if we should use cached results
// function shouldUseCache() {
//   if (!lastFetchTime) return false;
//   if (cachedEvents.length === 0) return false;
  
//   const timeSinceLastFetch = Date.now() - lastFetchTime;
//   return timeSinceLastFetch < CACHE_DURATION;
// }

// // Endpoint: GET /events
// app.get('/events', async (req, res) => {
//   try {
//     // Check if we can use cached results
//     if (shouldUseCache()) {
//       console.log('Returning cached events');
//       return res.json({
//         events: cachedEvents,
//         cached: true,
//         lastFetched: lastFetchTime
//       });
//     }
    
//     console.log('Fetching fresh events data');
//     const events = await getAllEvents(instagramPages);
    
//     // Update cache
//     cachedEvents = events;
//     lastFetchTime = Date.now();
    
//     res.json({
//       events,
//       cached: false,
//       lastFetched: lastFetchTime
//     });
//   } catch (err) {
//     console.error('Error in /events endpoint:', err);
//     res.status(500).json({
//       error: 'Error fetching events',
//       message: err.message
//     });
//   }
// });

// // Endpoint to force refresh the cache
// app.post('/refresh', async (req, res) => {
//   try {
//     console.log('Manually refreshing events data');
//     const events = await getAllEvents(instagramPages);
    
//     // Update cache
//     cachedEvents = events;
//     lastFetchTime = Date.now();
    
//     res.json({
//       events,
//       refreshed: true,
//       lastFetched: lastFetchTime
//     });
//   } catch (err) {
//     console.error('Error in /refresh endpoint:', err);
//     res.status(500).json({
//       error: 'Error refreshing events',
//       message: err.message
//     });
//   }
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     uptime: process.uptime(),
//     timestamp: Date.now()
//   });
// });

// // Add endpoint to configure Instagram pages
// app.post('/configure', (req, res) => {
//   const { pages } = req.body;
  
//   if (!Array.isArray(pages)) {
//     return res.status(400).json({
//       error: 'Invalid configuration',
//       message: 'Pages must be an array of Instagram URLs'
//     });
//   }
  
//   // Update the Instagram pages
//   instagramPages.length = 0;
//   pages.forEach(page => instagramPages.push(page));
  
//   // Clear cache to force refresh with new pages
//   cachedEvents = [];
//   lastFetchTime = null;
  
//   res.json({
//     message: 'Configuration updated',
//     pages: instagramPages
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Monitoring Instagram pages: ${instagramPages.join(', ')}`);
// });

// // Handle graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received, shutting down gracefully');
//   process.exit(0);
// });

// process.on('SIGINT', () => {
//   console.log('SIGINT received, shutting down gracefully');
//   process.exit(0);
// });