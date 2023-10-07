// app/utils/api.js

export const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/flights');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching flight data:', error);
      return null;
    }
  };
  