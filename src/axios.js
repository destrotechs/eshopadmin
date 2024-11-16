import axios from 'axios';

let showMessageAlert;

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('RRRRRR', response);
    if (
      response.data &&
      response.data.success !== null &&
      response.data.success !== '' &&
      showMessageAlert
    ) {
      showMessageAlert(response.data?.success, 'success');
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { data, status } = error.response;

      if (data.error && showMessageAlert) {
        showMessageAlert(data.error, 'error');
      } else if (status === 401 && showMessageAlert) {
        showMessageAlert('Unauthorized access. Redirecting to login.', 'error');
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
      } else if (status === 400 && showMessageAlert) {
        showMessageAlert('Invalid request. Please check your inputs.', 'error');
      } else if (showMessageAlert) {
        showMessageAlert('An unexpected error occurred.', 'error');
      }
    } else if (showMessageAlert) {
      showMessageAlert('Network error. Check your connection.', 'error');
    }

    return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
  }
);

export const setMessageAlertFunction = (alertFn) => {
  showMessageAlert = alertFn;
};

export default axiosInstance;
