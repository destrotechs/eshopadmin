import axios from 'axios';

let showMessageAlert = null; // Placeholder for the alert function

// Function to set the alert function dynamically
export const setMessageAlertFunction = (alertFunction) => {
  showMessageAlert = alertFunction;
};

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8001/', // Change to localhost
  withCredentials: true, // Ensures cookies are sent with the request
});

// Add a request interceptor to include the token and CSRF token
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Set the Authorization header with the token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful, simply return the response
    return response;
  },
  (error) => {
    console.error('Response error:', error);

    // Use the showMessageAlert function if available
    if (showMessageAlert) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        'An unexpected error occurred.';
      const severity = 'error';

      showMessageAlert(message, severity);
    }

    // Handle 401 errors (Unauthorized)
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;

      if (currentPath !== '/signin') {
        window.location.href = '/signin';
      }
    } else if (error.response && error.response.status === 400) {
      console.error('Invalid form data:', error.response.data.errors);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
