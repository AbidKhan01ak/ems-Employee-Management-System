import { showErrorPopup } from './showErrorPopup'; // Assuming showErrorPopup is in the same directory

// Universal error handler function
export const handleError = (error, customMessage = "An unexpected error occurred") => {
    if (error.response) {
        // The server responded with a status other than 2xx
        showErrorPopup(error.response.data.message || customMessage);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
        showErrorPopup("No response from the server. Please check your connection.");
    } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
        showErrorPopup(customMessage);
    }
};
