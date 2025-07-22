/**
 * API module - Communication with JSONPlaceholder API
 * Asynchronous data operations using Fetch API
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export class ApiService {
    /**
     * Send HTTP GET request
     * @param {string} endpoint - API endpoint
     * @returns {Promise} - API response
     */
    static async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * Send HTTP POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Data to send
     * @returns {Promise} - API response
     */
    static async post(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    /**
     * Send HTTP PUT request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Data to update
     * @returns {Promise} - API response
     */
    static async put(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    }

    /**
     * Send HTTP DELETE request
     * @param {string} endpoint - API endpoint
     * @returns {Promise} - API response
     */
    static async delete(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }
}

/**
 * User API operations
 */
export class UserApi {
    /**
     * Get all users
     * @returns {Promise<Array>} - User list
     */
    static async getAllUsers() {
        return await ApiService.get('/users');
    }

    /**
     * Get a specific user
     * @param {number} id - User ID
     * @returns {Promise<Object>} - User data
     */
    static async getUserById(id) {
        return await ApiService.get(`/users/${id}`);
    }

    /**
     * Create a new user
     * @param {Object} userData - User data
     * @returns {Promise<Object>} - Created user
     */
    static async createUser(userData) {
        return await ApiService.post('/users', userData);
    }

    /**
     * Update a user
     * @param {number} id - User ID
     * @param {Object} userData - Data to update
     * @returns {Promise<Object>} - Updated user
     */
    static async updateUser(id, userData) {
        return await ApiService.put(`/users/${id}`, userData);
    }

    /**
     * Delete a user
     * @param {number} id - User ID
     * @returns {Promise<boolean>} - Result of delete operation
     */
    static async deleteUser(id) {
        return await ApiService.delete(`/users/${id}`);
    }
}
