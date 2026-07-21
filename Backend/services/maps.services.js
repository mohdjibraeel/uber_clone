const axios = require("axios");
const Captain = require("../models/captain");

const LOCATIONIQ_KEY = () => process.env.LOCATIONIQ_API_KEY;
const OSRM_BASE_URL = process.env.OSRM_BASE_URL || "https://router.project-osrm.org";

// ---- Geocoding (address -> coordinates) via LocationIQ ----
module.exports.getAddressCoordinate = async (address) => {
  if (!address || typeof address !== "string") {
    throw new Error("Address is required and must be a string");
  }

  const apiKey = LOCATIONIQ_KEY();
  if (!apiKey) {
    throw new Error("LocationIQ API key not set in environment variables");
  }

  const url = `https://us1.locationiq.com/v1/search`;

  try {
    const { data } = await axios.get(url, {
      params: {
        key: apiKey,
        q: address,
        format: "json",
        limit: 1,
      },
    });

    if (!data || data.length === 0) {
      throw new Error(`Geocoding failed: no results for "${address}"`);
    }

    const loc = data[0];
    return { ltd: parseFloat(loc.lat), lng: parseFloat(loc.lon) };
  } catch (err) {
    const msg = err.response?.data?.error || err.message;
    throw new Error(`Failed to get coordinates for address "${address}": ${msg}`);
  }
};

// ---- Distance + Duration via OSRM (needs coordinates, so we geocode first) ----
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    const [originCoords, destCoords] = await Promise.all([
      module.exports.getAddressCoordinate(origin),
      module.exports.getAddressCoordinate(destination),
    ]);

    const coordsStr = `${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}`;
    const url = `${OSRM_BASE_URL}/route/v1/driving/${coordsStr}`;

    const { data } = await axios.get(url, {
      params: { overview: "false" },
    });

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
      throw new Error("No Routes Found");
    }

    const route = data.routes[0];

    return {
      distance: {
        value: Math.round(route.distance), // meters
        text: `${(route.distance / 1000).toFixed(1)} km`,
      },
      duration: {
        value: Math.round(route.duration), // seconds
        text: `${Math.round(route.duration / 60)} mins`,
      },
    };
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to get distance/time: ${err.message}`);
  }
};

// ---- Autocomplete via LocationIQ ----
module.exports.getAutoSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is Required");
  }

  const apiKey = LOCATIONIQ_KEY();
  if (!apiKey) {
    throw new Error("LocationIQ API key not set in environment variables");
  }

  const url = `https://api.locationiq.com/v1/autocomplete`;

  try {
    const { data } = await axios.get(url, {
      params: {
        key: apiKey,
        q: input,
        format: "json",
        limit: 5,
      },
    });

    if (!Array.isArray(data)) {
      throw new Error("Unable to fetch suggestions");
    }

    // Reshape to match what the frontend expects: elem.description
    return data.map((item) => ({
      description: item.display_name,
      place_id: item.place_id,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (err) {
    console.log(err);
    throw new Error(`Unable to fetch suggestions: ${err.response?.data?.error || err.message}`);
  }
};

// ---- Nearby captains (unchanged, MongoDB geospatial query, not tied to Google/LocationIQ) ----
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
            coordinates: [lng, ltd], // always [lng, lat]
          },
          $maxDistance: radiusKm * 1000, // km -> meters
        },
      },
    });

    return captains;
  } catch (err) {
    throw new Error(`Failed to fetch captains in radius: ${err.message}`);
  }
};