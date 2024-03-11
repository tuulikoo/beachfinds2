import axios from 'axios';

// Define your GraphQL endpoint
const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql'; // Adjust this to your actual GraphQL server endpoint

type LocationDetailsInput = {
    lat: number
    lng: number
    continent: string
    country: string
    state: string
    town: string
  }

const fetchFromOpenCage = async (lat:number, lng:number) => {
  const apiKey = '88804a8245c24555a671aaf4b1b6e87c'; // Replace with your actual OpenCage API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.results.length > 0) {
      const result = response.data.results[0];
      // Extract the details you need from the result
      const locationDetails = {
        continent: result.components.continent,
        country: result.components.country,
        state: result.components.state,
        town: result.components.town,
        lat: lat,
        lng: lng,
      };
      console.log('Location details:', locationDetails);
      await saveLocationDetailsToDB(locationDetails); // Call the function to save details to DB
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching location details:', error);
    throw error;
  }
};

const saveLocationDetailsToDB = async (locationDetails: LocationDetailsInput) => {
    try {
      // Construct the mutation, including lat and lng in the request
      const mutation = `
        mutation {
          createLocationDetails(locationDetails: {
            lat: ${locationDetails.lat},
            lng: ${locationDetails.lng},
            continent: "${locationDetails.continent}",
            country: "${locationDetails.country}",
            state: "${locationDetails.state}",
            town: "${locationDetails.town}",
          }) {
            id
            lat
            lng
            continent
            country
            state
            town
          }
        }
      `;
  
      // Make the request to your GraphQL server
      const response = await axios.post(
        GRAPHQL_ENDPOINT,
        { query: mutation },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Handle the response
      if (response.data.errors) {
        console.error('GraphQL errors:', response.data.errors);
      } else {
        console.log('Location details saved:', response.data.data.createLocationDetails);
      }
    } catch (error) {
      console.error('Error saving location details to DB:', error);
      throw error;
    }
  };

export { fetchFromOpenCage, saveLocationDetailsToDB };
