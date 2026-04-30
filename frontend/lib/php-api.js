// PHP API client for communicating with the PHP backend
const PHP_API_BASE_URL = 'http://localhost/php-api/public/api';

class PhpApiClient {
  constructor() {
    this.baseUrl = PHP_API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}/${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Users API
  async getUsers() {
    return this.request('getUsers.php');
  }

  // Menu API
  async getMenuItems() {
    return this.request('getMenuItems.php');
  }

  // Bookings API
  async getBookings() {
    return this.request('getBookings.php');
  }
}

// Create and export a singleton instance
const phpApi = new PhpApiClient();
export default phpApi;
