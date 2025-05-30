import axios from 'axios';

const API_BASE_URL = 'http://your-pc2-server-url/api'; // Replace with your actual PC2 server URL

export const fetchContestDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contest details:', error);
    throw error;
  }
};

export const fetchTeamScores = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team scores:', error);
    throw error;
  }
};