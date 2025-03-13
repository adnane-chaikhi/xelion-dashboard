import axios from 'axios';

const checkSession = async () => {
  try {
    const response = await axios.get('http://localhost/cleanease/backend/controllers/login.php', { withCredentials: true });

    return response.data.success; // Returns true if user is logged in, false otherwise
  } catch (error) {
    console.error('Error checking session:', error);
    return false; // Return false on error
  }
};

export default checkSession;
