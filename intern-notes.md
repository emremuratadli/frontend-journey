# Frontend Intern Notes

## 1. NVM (Node Version Manager)
NVM allows developers to easily install, switch, and manage multiple versions of Node.js on the same machine.

### Why to Use NVM ?
* Allows switching between different Node.js versions (e.g., from v18.20.8 to v24.3.0)
* Enables using a specific Node.js version per project
* Ensures compatibility across team members and different environments

## 2. NGINX
NGINX is a high-performance web server and reverse proxy. It helps with load balancing, caching, and hiding backend services to improve performance and security.

### Why to Use NGINX ?
* Requests go through NGINX, not directly to the backend. It improves security.

* Distributes traffic to multiple servers. It prevents crashes.

* Stores static or frequent responses. It speeds up delivery.

## 3. Babel (Transpiler)
* Babel is a JavaScript transpiler that converts modern JavaScript (ES6+) into backward-compatible versions for older browsers.


## 4. Webpack
* Webpack is a module bundler for JavaScript applications. It takes modules with dependencies and bundles them into a single output file, optimizing the app for deployment.

## 5. Microfrontend
* Microfrontend architecture breaks a frontend monolith into smaller, independently deployable units, each managed by different teams or technologies.

## 6. SPA (Single Page Application)
 * A SPA loads a single HTML page and dynamically updates content without refreshing the whole page, offering a faster and smoother user experience.

## 7. SSG (Static Site Generation)

SSG pre-renders HTML pages at build time, serving fast and secure static content to users.

### Benefits:
- Fast performance
- Improved security
- Good for content-heavy, rarely updated pages

## 8. JSX
* JSX is a JavaScript syntax extension commonly used with React. It lets you write HTML-like code directly within JavaScript, making UI code easier to read and maintain.


## 9. TSX
* TSX is JSX with TypeScript. It allows using JSX syntax in `.tsx` files, combining React with TypeScript’s static typing for safer, more scalable code.


## 10. Types of CSS Styling


### External CSS
* CSS is written in a separate `.css` file and linked to the HTML using a `<link>` tag.
* Keeps styling separate from structure and improves reusability.

### Internal CSS
* CSS is written inside a `<style>` tag in the `<head>` of the HTML document.
* Useful for page-specific styles but not ideal for large projects.

### Inline CSS
* CSS is written directly in the `style` attribute of an HTML element.
* Useful for quick changes but not recommended for maintainability.

## 11. Vite

Vite is a modern frontend build tool that provides fast development and optimized production builds.

### Why to Use Vite?
- Lightning-fast dev server with Hot Module Replacement (HMR)
- Optimized production bundling (uses Rollup)
- Built-in support for React, Vue, and more
- Compatible with TypeScript, JSX, TSX, and CSS modules

## 12. ECMAScript Versions

### ES5
Released in 2009. Introduced `forEach`, `map`, `filter`, `Object.create()`, and strict mode. Fully supported by all browsers.

### ES6+
Modern JavaScript (2015+). Added `let`, `const`, arrow functions, template literals, destructuring, modules, classes, and promises.

