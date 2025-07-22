/**
 * User class - OOP structure representing user data
 */
export class User {
    constructor(data) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.website = data.website || '';
        this.address = data.address || {};
        this.company = data.company || {};
        this.createdAt = new Date();
    }

    /**
     * Returns the user's full name
     * @returns {string} - Full name of the user
     */
    getFullName() {
        return this.name || this.username;
    }

    /**
     * Validate the user's email address
     * @returns {boolean} - Is the email valid?
     */
    isEmailValid() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    /**
     * Clean the user's phone number
     * @returns {string} - Cleaned phone number
     */
    getCleanPhone() {
        return this.phone.replace(/[^\d]/g, '');
    }

    /**
     * Format the user's website URL
     * @returns {string} - Formatted URL
     */
    getWebsiteUrl() {
        if (!this.website) return '';
        
        // Eğer http/https ile başlamıyorsa ekle
        if (!this.website.startsWith('http://') && !this.website.startsWith('https://')) {
            return `https://${this.website}`;
        }
        return this.website;
    }

    /**
     * Returns the user's full address
     * @returns {string} - Formatted address
     */
    getFullAddress() {
        if (!this.address || !this.address.street) return 'No address information';
        
        const { street, suite, city, zipcode } = this.address;
        return `${street}${suite ? ', ' + suite : ''}, ${city} ${zipcode}`;
    }

    /**
     * Returns the user's company information
     * @returns {string} - Company information
     */
    getCompanyInfo() {
        if (!this.company || !this.company.name) return 'No company information';
        
        const { name, catchPhrase, bs } = this.company;
        return {
            name,
            slogan: catchPhrase || '',
            business: bs || ''
        };
    }

    /**
     * Convert user data to API format
     * @returns {Object} - Data formatted for API
     */
    toApiFormat() {
        return {
            id: this.id,
            name: this.name,
            username: this.username,
            email: this.email,
            phone: this.phone,
            website: this.website,
            address: this.address,
            company: this.company
        };
    }

    /**
     * Generate HTML for the user card
     * @returns {string} - HTML string
     */
    toCardHTML() {
        return `
            <div class="user-card fade-in" data-user-id="${this.id}">
                <h3>${this.getFullName()}</h3>
                <div class="user-info">
                    <p class="email"><strong>Email:</strong> ${this.email}</p>
                    <p class="phone"><strong>Phone:</strong> ${this.phone}</p>
                    <p class="website"><strong>Website:</strong> 
                        <a href="${this.getWebsiteUrl()}" target="_blank" rel="noopener">${this.website}</a>
                    </p>
                </div>
                <div class="user-actions">
                    <button class="btn btn-danger delete-user" data-user-id="${this.id}">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Validate user data
     * @returns {Object} - Validation result
     */
    validate() {
        const errors = [];

        // Name check
        if (!this.name || this.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters');
        }

        // Email check
        if (!this.isEmailValid()) {
            errors.push('Please enter a valid email address');
        }

        // Phone check: only digits
        const cleanPhone = (this.phone || '').replace(/\D/g, '');
        if (!cleanPhone || cleanPhone.length < 10) {
            errors.push('Please enter a valid phone number');
        }

        // Website check: not empty and basic URL format
        const website = (this.website || '').trim();
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
        if (!website || !urlRegex.test(website)) {
            errors.push('Please enter a valid website address');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Static method - Create User object from form data
     * @param {FormData} formData - Form data
     * @returns {User} - New User instance
     */
    static fromFormData(formData) {
        return new User({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            website: formData.get('website'),
            username: formData.get('name')?.toLowerCase().replace(/\s+/g, '') || ''
        });
    }

    /**
     * Static method - Create User object from API response
     * @param {Object} apiData - Data from API
     * @returns {User} - New User instance
     */
    static fromApiData(apiData) {
        return new User(apiData);
    }
}

/**
 * UserManager class - Manages the user list
 */
export class UserManager {
    constructor() {
        this.users = [];
        this.filteredUsers = [];
        this.currentFilter = '';
    }

    /**
     * Add a new user to the user list
     * @param {User} user - User to add
     */
    addUser(user) {
        if (!(user instanceof User)) {
            throw new Error('The added object must be an instance of User');
        }
        
        this.users.push(user);
        this.applyCurrentFilter();
    }

    /**
     * Remove a user from the list
     * @param {number} userId - ID of the user to remove
     * @returns {boolean} - Was the removal successful?
     */
    removeUser(userId) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== userId);
        this.applyCurrentFilter();
        return this.users.length < initialLength;
    }

    /**
     * Find a user by ID
     * @param {number} userId - User ID
     * @returns {User|null} - Found user or null
     */
    getUserById(userId) {
        return this.users.find(user => user.id === userId) || null;
    }

    /**
     * Return all users
     * @returns {Array<User>} - User list
     */
    getAllUsers() {
        return [...this.users];
    }

    /**
     * Return filtered users
     * @returns {Array<User>} - Filtered user list
     */
    getFilteredUsers() {
        return [...this.filteredUsers];
    }

    /**
     * Filter users
     * @param {string} searchTerm - Search term
     */
    filterUsers(searchTerm) {
        this.currentFilter = searchTerm.toLowerCase();
        this.applyCurrentFilter();
    }

    /**
     * Apply the current filter
     */
    applyCurrentFilter() {
        if (!this.currentFilter) {
            this.filteredUsers = [...this.users];
        } else {
            this.filteredUsers = this.users.filter(user => 
                user.name.toLowerCase().includes(this.currentFilter) ||
                user.email.toLowerCase().includes(this.currentFilter) ||
                user.phone.includes(this.currentFilter)
            );
        }
    }

    /**
     * Clear the user list
     */
    clearUsers() {
        this.users = [];
        this.filteredUsers = [];
    }

    /**
     * Return the user count
     * @returns {Object} - Total and filtered user count
     */
    getUserCount() {
        return {
            total: this.users.length,
            filtered: this.filteredUsers.length
        };
    }

    /**
     * Sort users
     * @param {string} field - Sort field ('name', 'email', 'phone')
     * @param {string} direction - Sort direction ('asc', 'desc')
     */
    sortUsers(field, direction = 'asc') {
        const sortFunction = (a, b) => {
            let valueA = a[field] || '';
            let valueB = b[field] || '';
            
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            if (direction === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        };

        this.users.sort(sortFunction);
        this.filteredUsers.sort(sortFunction);
    }
}
