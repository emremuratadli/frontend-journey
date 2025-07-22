/**
 * Main application file - Combines all modules and manages the UI
 * Modern JavaScript app using ES6 Modules, Async/Await, and OOP
 */

// ES6 Module imports
import { UserApi } from './api.js';
import { User, UserManager } from './user.js';

/**
 * App class - Main application manager
 */
class App {
    constructor() {
        this.userManager = new UserManager();
        this.isLoading = false;
        this.initializeEventListeners();
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Add event listeners after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
        });
    }

    /**
     * Bind events to DOM elements
     */
    bindEvents() {
        // Load users button
        const loadUsersBtn = document.getElementById('loadUsersBtn');
        loadUsersBtn?.addEventListener('click', () => this.loadUsers());

        // Add new user button
        const addUserBtn = document.getElementById('addUserBtn');
        addUserBtn?.addEventListener('click', () => this.showUserForm());

        // Cancel button in form
        const cancelBtn = document.getElementById('cancelBtn');
        cancelBtn?.addEventListener('click', () => this.hideUserForm());

        // User creation form
        const createUserForm = document.getElementById('createUserForm');
        createUserForm?.addEventListener('submit', (e) => this.handleCreateUser(e));

        // Event delegation for dynamic buttons
        const usersGrid = document.getElementById('usersGrid');
        usersGrid?.addEventListener('click', (e) => this.handleUserAction(e));
    }

    /**
     * Show/hide loading state
     * @param {boolean} show - Should loading be shown?
     */
    toggleLoading(show) {
        this.isLoading = show;
        const loading = document.getElementById('loading');
        const loadUsersBtn = document.getElementById('loadUsersBtn');
        
        if (loading) {
            loading.style.display = show ? 'flex' : 'none';
        }
        
        if (loadUsersBtn) {
            loadUsersBtn.disabled = show;
            loadUsersBtn.textContent = show ? 'Loading...' : 'Load Users';
        }
    }

    /**
     * Show message (success/error)
     * @param {string} message - Message to show
     * @param {string} type - Message type ('success' or 'error')
     */
    showMessage(message, type = 'success') {
        // Remove old messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type} fade-in`;
        messageDiv.textContent = message;

        // Add message below controls section
        const controls = document.querySelector('.controls');
        controls.parentNode.insertBefore(messageDiv, controls.nextSibling);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    /**
     * Load users from API
     */
    async loadUsers() {
        if (this.isLoading) return;

        try {
            this.toggleLoading(true);
            this.showMessage('Loading users...', 'success');

            // Fetch users from API
            const usersData = await UserApi.getAllUsers();
            
            // Clear UserManager and add new users
            this.userManager.clearUsers();
            
            usersData.forEach(userData => {
                const user = User.fromApiData(userData);
                this.userManager.addUser(user);
            });

            // Update UI
            this.renderUsers();
            this.showMessage(`${usersData.length} users loaded successfully!`, 'success');

        } catch (error) {
            console.error('Error loading users:', error);
            this.showMessage('An error occurred while loading users. Please try again.', 'error');
        } finally {
            this.toggleLoading(false);
        }
    }

    /**
     * Show user form
     */
    showUserForm() {
        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.style.display = 'block';
            userForm.classList.add('slide-up');
            
            // Focus first input
            const firstInput = userForm.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }

    /**
     * Hide user form
     */
    hideUserForm() {
        const userForm = document.getElementById('userForm');
        const form = document.getElementById('createUserForm');
        
        if (userForm) {
            userForm.style.display = 'none';
        }
        
        if (form) {
            form.reset(); // Reset form
        }
    }

    /**
     * Handle new user creation form
     * @param {Event} event - Form submit event
     */
    async handleCreateUser(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.target);

            // Create User object from form data
            const newUser = new User({
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                website: formData.get('website'),
                username: formData.get('name')?.toLowerCase().replace(/\s+/g, '') || ''
            });

            // Validate user data
            const validation = newUser.validate();
            if (!validation.isValid) {
                this.showMessage(`Error: ${validation.errors.join(', ')}`, 'error');
                return;
            }

            // Send user to API
            this.showMessage('Creating user...', 'success');
            const createdUser = await UserApi.createUser(newUser.toApiFormat());
            
            // Add new user to list (mock ID)
            createdUser.id = Date.now(); // JSONPlaceholder does not return real ID
            const userToAdd = User.fromApiData(createdUser);
            this.userManager.addUser(userToAdd);

            // Update UI
            this.renderUsers();
            this.hideUserForm();
            this.showMessage('User created successfully!', 'success');

        } catch (error) {
            console.error('Error creating user:', error);
            this.showMessage('An error occurred while creating the user. Please try again.', 'error');
        }
    }

    /**
     * Handle user actions (delete etc.)
     * @param {Event} event - Click event
     */
    async handleUserAction(event) {
        if (event.target.classList.contains('delete-user')) {
            const userId = parseInt(event.target.dataset.userId);
            await this.deleteUser(userId);
        }
    }

    /**
     * Delete user
     * @param {number} userId - ID of user to delete
     */
    async deleteUser(userId) {
        const user = this.userManager.getUserById(userId);
        if (!user) return;

        // Confirm
        const confirmed = confirm(`Are you sure you want to delete user "${user.getFullName()}"?`);
        if (!confirmed) return;

        try {
            this.showMessage('Deleting user...', 'success');
            
            // Delete from API
            await UserApi.deleteUser(userId);
            
            // Remove from local list
            this.userManager.removeUser(userId);
            
            // Update UI
            this.renderUsers();
            this.showMessage('User deleted successfully!', 'success');

        } catch (error) {
            console.error('Error deleting user:', error);
            this.showMessage('An error occurred while deleting the user. Please try again.', 'error');
        }
    }

    /**
     * Render users on screen
     */
    renderUsers() {
        const usersGrid = document.getElementById('usersGrid');
        if (!usersGrid) return;

        const users = this.userManager.getFilteredUsers();
        
        if (users.length === 0) {
            usersGrid.innerHTML = `
                <div class="no-users">
                    <p>No users loaded yet. Click "Load Users" button.</p>
                </div>
            `;
            return;
        }

        // Create user cards
        const userCardsHTML = users.map(user => user.toCardHTML()).join('');
        usersGrid.innerHTML = userCardsHTML;

        // Trigger animations
        const userCards = usersGrid.querySelectorAll('.user-card');
        userCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Start the application
     */
    start() {
        console.log('🚀 JSONPlaceholder User Manager app started!');
        console.log('📋 Features:');
        console.log('   • ES6 Modules usage');
        console.log('   • Async/Await for API operations');
        console.log('   • OOP structure for code organization');
        console.log('   • Modern CSS with responsive design');
    }
}

// Start the app
const app = new App();
app.start();

// Add app to global scope (for debugging)
window.app = app;
