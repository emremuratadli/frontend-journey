# JSONPlaceholder User Management

A user management web application built with modern JavaScript (ES6 modules, OOP, async/await), HTML5, and CSS3. All user operations use the JSONPlaceholder API.

## Features

- List users from the API
- Add new user (with form validation)
- Delete user
- Responsive and modern UI (Poppins font, CSS Grid/Flexbox)
- Modular code structure (api.js, user.js, script.js)

## Technologies Used
- **JavaScript (ES6+)**: Classes, modules, async/await
- **HTML5**: Semantic markup
- **CSS3**: Responsive design, modern layout, animations
- **JSONPlaceholder**: Fake REST API for prototyping

## Project Structure
```
js-modules-api-project/
├── index.html         # Main HTML file
├── style.css          # Stylesheet (Poppins font, modern UI)
├── script.js          # Main application logic (UI, events)
├── api.js             # API abstraction (fetch, CRUD)
├── user.js            # User & UserManager classes
├── intern-notes-6.md  # Research notes
└── README.md          # Project documentation
```

## Modules
- **api.js**: Handles all HTTP requests (GET, POST, PUT, DELETE) to JSONPlaceholder
- **user.js**: `User` class (single user logic) and `UserManager` class (user list management)
- **script.js**: Main application logic, event binding, UI rendering

## Live Demo

[View the project live on GitHub Pages.](https://emremuratadli.github.io/frontend-journey/js-modules-api-project/)

## Usage
- Click the **Load Users** button to list users.
- Use **Add New User** to open the form, fill in the details, and save.
- Use **Delete** on the user card to remove a user.

## Notes
- All data operations are mocked with JSONPlaceholder; no real data is changed.
- The UI and code are entirely in English.
- Poppins font is used for a modern look.

## Contact
This project was developed by Emre Murat Adlı as part of a frontend learning journey.

---

**Purpose:** To practice modern JavaScript, modular architecture, and frontend best practices in a realistic project.
- **User Listing**: Fetch users from the `/users` endpoint
- **User Creation**: Create new user records
- **User Deletion**: Remove existing users
- **Responsive Design**: Mobile and desktop friendly interface

### Technical Features
- **ES6 Modules**: Modular code organization
- **Async/Await**: Modern asynchronous programming
- **Object-Oriented Programming**: Class-based code structure
- **Fetch API**: Modern approach for HTTP requests
- **CSS Grid & Flexbox**: Modern layout techniques

## Project Structure

```
js-modules-api-project/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # Main application code
├── api.js              # API operations module
├── user.js             # User class and UserManager
├── intern-notes-6.md   # Research notes
└── README.md           # Project documentation
```

## Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling, Grid, Flexbox, Animations
- **JavaScript ES6+**: Classes, Modules, Async/Await, Arrow Functions

### API
- **JSONPlaceholder**: Fake REST API for testing
- **Fetch API**: HTTP client

### Modular Structure
- **ES6 Modules**: `import`/`export` syntax
- **Class-based OOP**: Modern JavaScript class syntax
- **Separation of Concerns**: Each module has a specific responsibility

## Module Details

### 1. `api.js` - API Operations Module
```javascript
export class ApiService {
    static async get(endpoint)      // GET requests
    static async post(endpoint, data) // POST requests
    static async put(endpoint, data)  // PUT requests
    static async delete(endpoint)     // DELETE requests
}

export class UserApi {
    static async getAllUsers()        // Get all users
    static async createUser(userData) // Create new user
    static async deleteUser(id)       // Delete user
}
```

### 2. `user.js` - User Classes
```javascript
export class User {
    constructor(data)           // User constructor
    getFullName()              // Full name
    isEmailValid()             // Email validation
    validate()                 // Data validation
    toCardHTML()               // Generate HTML card
}

export class UserManager {
    addUser(user)             // Add user
    removeUser(userId)        // Remove user
    filterUsers(searchTerm)   // Filter users
    sortUsers(field, direction) // Sorting
}
```

### 3. `script.js` - Main Application
```javascript
class App {
    async loadUsers()         // Load users
    async handleCreateUser()  // Create user
    async deleteUser()        // Delete user
    renderUsers()             // Render UI
}
```

## CSS Features

- **CSS Grid**: Responsive user cards
- **Flexbox**: Layout arrangement
- **CSS Variables**: Color palette management
- **Animations**: Smooth transitions and hover effects
- **Glass-morphism**: Modern blur effects
- **Mobile-first**: Responsive design approach

## Asynchronous Operations

### Promise-based API Calls
```javascript
// Loading state management
async loadUsers() {
    try {
        this.toggleLoading(true);
        const users = await UserApi.getAllUsers();
        // After operation
    } catch (error) {
        this.showMessage('An error occurred', 'error');
    } finally {
        this.toggleLoading(false);
    }
}
```

### Error Handling
- Error handling with try-catch blocks
- User-friendly error messages
- Loading states

## OOP Principles

### Encapsulation
- Combining data and methods within a class
- Private/public method distinction

### Inheritance
- Using ES6 class syntax
- Method overriding

### Polymorphism
- Interface-like method implementations

### Abstraction
- Hiding complex operations behind simple interfaces

## User Guide

### 1. Running the Project
```bash
# Start HTTP server (Python)
python -m http.server 8000

# or Node.js live-server
npx live-server

# Open in browser
http://localhost:8000
```

### 2. Basic Operations
1. **Load Users**: Click the "Load Users" button
2. **Add New User**: Click "Add New User" → Fill the form → "Save"
3. **Delete User**: Click the "Delete" button on the user card

## Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Breakpoints
```css
@media (max-width: 768px) {
    .users-grid { grid-template-columns: 1fr; }
    .controls { flex-direction: column; }
}
```

## Error Management

### API Errors
- Network errors
- HTTP status codes
- JSON parsing errors

### Validation Errors
- Email format validation
- Required field checks
- Data type validation

### User Experience
- Loading states
- Success/error messages
- Confirmation dialogs

## Topics Learned

### ES6 Modules
- `import`/`export` syntax
- Named vs default exports
- Module organization

### Async Programming
- `async`/`await` patterns
- Promise handling
- Error propagation

### OOP in JavaScript
- ES6 Class syntax
- Constructor methods
- Static methods
- Method chaining

### Modern CSS
- CSS Grid layout
- Flexbox alignment
- CSS custom properties
- Responsive design patterns

---

**Project Goal**: To gain experience developing real-world applications using modern JavaScript technologies.
