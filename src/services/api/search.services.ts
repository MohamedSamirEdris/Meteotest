import axios from 'axios';

export const fetchInitialSearchList = async () => {
  try {
    const response = await axios.get(
      'https://smart-urban-heat-map.ch/api/1.0/stations'
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
