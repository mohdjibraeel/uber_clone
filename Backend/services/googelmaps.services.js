const axios = require("axios");
const Captain = require("../models/captain");

module.exports.getAddressCoordinate = async (address) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address is required and must be a string");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey)
    throw new Error("Google Maps API key not set in environment variables");

  const encoded = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      throw new Error(
        `Geocoding failed: ${data.status} ${data.error_message || ""}`.trim(),
      );
    }
    const loc = data.results[0].geometry.location;
    return { ltd: loc.lat, lng: loc.lng };
  } catch (err) {
    throw new Error(
      `Failed to get coordinates for address "${address}": ${err.message}`,
    );
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No Routes Found");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getAutoSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is Required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status == "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.getCaptainsInRadius = async (ltd, lng, radiusKm) => {
  if (ltd == null || lng == null || radiusKm == null) {
    throw new Error("Latitude, longitude, and radius are required");
  }

  try {
    const captains = await Captain.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, ltd], // ✅ ALWAYS [lng, lat]
          },
          $maxDistance: radiusKm * 1000, // km → meters
        },
      },
    });

    return captains;
  } catch (err) {
    throw new Error(`Failed to fetch captains in radius: ${err.message}`);
  }
};
