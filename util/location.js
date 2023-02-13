const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'pk.5d6230aafeec0f0d9a5025bd3a140a6c';

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };

  const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(address)}&format=json`);

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError('Could not find location for the specified address.', 422);
    throw error;
  }

  const coorLat = data[0].lat;
  const coorLon = data[0].lon;
  const coordinates = {
    lat: coorLat,
    lng: coorLon,
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
