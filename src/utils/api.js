const API_BASE_URL = 'https://webbe-stage.bloom-bi.it/api';
const API_KEY = 'c0fBMQ9Fxokt3OqgD2hYWHkLkbBgTgYCaIfw4kOARWodj6sbLJ2a2oyVfJWlQR';

if (!API_BASE_URL || !API_KEY) {
  console.error('API configuration is missing. Please check your environment variables.');
}

/**
 * Common fetch utility function for making API calls
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - Response from the API
 */
export const fetchApi = async (endpoint, options = {}) => {
  if (!API_KEY) {
    throw new Error('API configuration is missing. Please check your environment variables.');
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API call failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Example usage functions
export const subscribeToNewsletter = async (email) => {
  return fetchApi('/newsletter/subscribe', {
    method: 'POST',
    body: { email },
  });
};

export const submitContactForm = async (formData) => {
  return fetchApi('/contact-form/submit', {
    method: 'POST',
    body: formData,
  });
};

export const sendEnquiry = async (formData) => {
  return fetchApi('/express-connect/submit', {
    method: 'POST',
    body: formData,
  });
};