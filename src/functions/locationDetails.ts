import axios from "axios";
import "dotenv/config";

// Define your GraphQL endpoint tuulikiv-beachfinds.azurewebsites.net/graphql OR localhost:3000/graphql
const GRAPHQL_ENDPOINT = "https://tuulikiv-beachfinds.azurewebsites.net/graphql"; // Adjust this to your actual GraphQL server endpoint

type LocationDetailsInput = {
  lat: number;
  lng: number;
  continent: string;
  country: string;
  state: string;
  town: string;
};

const fetchFromOpenCage = async (lat: number, lng: number) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  console.log("API Key:", apiKey);
  
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.results.length > 0) {
      const result = response.data.results[0];
      // Extract the details you need from the result
      const locationDetails = {
        continent: result.components.continent || 'Unknown Continent',
        country: result.components.country || 'Unknown Country',
        state: result.components.state || 'Unknown State',
        town: result.components.town || 'Unknown Town',
        lat: lat,
        lng: lng,
      };
      console.log("Location details:", locationDetails);
      await saveLocationDetailsToDB(locationDetails); // Call the function to save details to DB
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw error;
  }
};
//TODO: If coordinates exist in locationdetails db, do not fetch again

const saveLocationDetailsToDB = async (
  locationDetails: LocationDetailsInput
) => {
  const query = `
    mutation CreateLocationDetail($input: LocationDetailsInput!) {
      createLocationDetail(input: $input) {
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

  const variables = {
    input: locationDetails,
  };

  console.log("Sending mutation:", query, "with variables:", variables);

  try {
    const response = await axios.post(
      GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response:", response.data);

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("Failed to save location details due to GraphQL errors");
    } else {
      console.log(
        "Location details saved successfully:",
        response.data.data.createLocationDetails
      );
      return response.data.data.createLocationDetails;
    }
  } catch (error) {
    console.error("Error saving location details to DB:", error);
    throw error;
  }
};

export { fetchFromOpenCage, saveLocationDetailsToDB };
