const axios =require('axios');

module.exports.getAddressCoordinate=async (address)=>{
  if (!address || typeof address !== 'string') {
    throw new Error('Address is required and must be a string');
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) throw new Error('Google Maps API key not set in environment variables');

  const encoded = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      throw new Error(`Geocoding failed: ${data.status} ${data.error_message || ''}`.trim());
    }
    const loc = data.results[0].geometry.location;
    return { ltd: loc.lat, lang: loc.lng };
  } catch (err) {
    throw new Error(`Failed to get coordinates for address "${address}": ${err.message}`);
  }
}