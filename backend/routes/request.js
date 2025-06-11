const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Request = require('../models/Request');
const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token);
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Submit request
router.post('/', auth, async (req, res) => {
  const { name, phone, problem, location } = req.body;
  console.log('Received request:', { name, phone, problem, location });
  try {
    const locationRegex = /^-?\d+\.\d{4,}\s*,\s*-?\d+\.\d{4,}$/;
    if (!locationRegex.test(location)) {
      console.log('Invalid location format:', location);
      return res.status(400).json({ msg: 'Invalid location format. Please use latitude,longitude (e.g., 28.6247,77.3728)' });
    }
    const request = new Request({ userId: req.user.id, name, phone, problem, location });
    await request.save();
    console.log('Request saved:', request);
    return res.json({ msg: 'Request submitted successfully' });
  } catch (err) {
    console.error('Request save error:', err.message);
    return res.status(500).json({ msg: `Server error: Failed to save request - ${err.message}` });
  }
});

// Find nearby mechanics
router.get('/mechanics', auth, async (req, res) => {
  const { location } = req.query;
  console.log('Fetching mechanics for location:', location);
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.log('GoMaps API key missing');
    return res.status(400).json({ msg: 'GoMaps API key is missing' });
  }
  const locationRegex = /^-?\d+\.\d{4,}\s*,\s*-?\d+\.\d{4,}$/;
  if (!locationRegex.test(location)) {
    console.log('Invalid location format:', location);
    return res.status(400).json({ msg: 'Invalid location format. Please use latitude,longitude (e.g., 28.6247,77.3728)' });
  }
  try {
    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${location}&radius=10000&type=car_repair&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    console.log('GoMaps API response:', response.data);
    if (response.data.status === 'REQUEST_DENIED') {
      console.log('GoMaps API request denied:', response.data.error_message);
      return res.status(400).json({ msg: `GoMaps API error: ${response.data.error_message}` });
    }
    if (response.data.status === 'ZERO_RESULTS') {
      console.log('No mechanics found for location:', location);
      return res.json([]);
    }
    const mechanics = response.data.results.map((place) => ({
      name: place.name,
      address: place.vicinity,
      phone: place.phone_number || 'N/A',
      place_id: place.place_id,
    }));
    console.log('Mechanics fetched:', mechanics);
    const hasPhoneNumbers = mechanics.some((mechanic) => mechanic.phone !== 'N/A');
    if (!hasPhoneNumbers) {
      console.log('Warning: No phone numbers available for any mechanics');
    }
    return res.json(mechanics);
  } catch (err) {
    console.error('Mechanics fetch error:', err.response?.data || err.message);
    return res.status(500).json({ msg: `Error fetching mechanics: ${err.response?.data?.error_message || err.message}` });
  }
});

module.exports = router;