# Research Notes

**Topic:** JavaScript Modular Structures, Asynchronous Programming and Object-Oriented Programming

## Research Questions:

### 1. Modular Structure

Research the following topics and explain each one in your own words. Support with code examples.

#### What is ES6 Module System?

The ES6 (ECMAScript 2015) module system is a standard used to organize JavaScript code and divide it into reusable parts. It is one of the fundamental features of modern JavaScript.

**Features:**
- Provides code organization and modularity
- Protects variable and function scope
- Clearly defines dependencies
- Supports tree-shaking (removing unused code)

```javascript
// math.js - Module file
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Default export
export default function subtract(a, b) {
    return a - b;
}
```

#### How Do Export and Import Work?

**Export:** Used to expose functions, variables, classes, etc. from a module to the outside.
**Import:** Used to bring exported items from other modules into our own module.

```javascript
// utilities.js
export const version = "1.0.0";
export function formatDate(date) {
    return date.toLocaleDateString();
}

// main.js
import { version, formatDate } from './utilities.js';
import subtract from './math.js'; // default import

console.log(version); // "1.0.0"
console.log(formatDate(new Date()));
console.log(subtract(10, 5)); // 5
```

#### What are the Differences Between Default Export and Named Export?

**Named Export:**
- Multiple items can be exported from a module
- Curly braces {} are used when importing
- The `as` keyword is used to change names

**Default Export:**
- Only one default export can exist per module
- Curly braces are not used when importing
- You can give it any name you want

```javascript
// named-exports.js
export const config = { theme: 'dark' };
export function helper() { return 'help'; }

// default-export.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

// import examples
import { config, helper as helperFunction } from './named-exports.js';
import User from './default-export.js'; // We can give it any name we want
import MyUser from './default-export.js'; // This is also valid
```

#### Why Are Modules Used? What is Their Contribution to Code Organization?

**Benefits:**
1. **Code Organization:** Divides large projects into small, manageable parts
2. **Reusability:** Code written once can be used in different places
3. **Namespace Protection:** Prevents global scope pollution
4. **Dependency Management:** Clearly shows which module depends on what
5. **Testability:** Each module can be tested separately

```javascript
// Bad example - everything in one file
function validateEmail(email) { /* ... */ }
function sendEmail(to, subject, body) { /* ... */ }
function formatCurrency(amount) { /* ... */ }
function calculateTax(amount) { /* ... */ }

// Good example - modular structure
// validation.js
export function validateEmail(email) { /* ... */ }
export function validatePhone(phone) { /* ... */ }

// email.js
export function sendEmail(to, subject, body) { /* ... */ }
export function createTemplate(data) { /* ... */ }

// currency.js
export function formatCurrency(amount) { /* ... */ }
export function calculateTax(amount) { /* ... */ }
```

---

### 2. Asynchronous Programming

#### What is the Difference Between Synchronous and Asynchronous Operations?

**Synchronous Programming:**
- Code runs sequentially, the next one doesn't start until the previous one is completed
- Has a blocking structure
- Simple and easy to understand

**Asynchronous Programming:**
- Code can run simultaneously
- Has a non-blocking structure
- Provides performance advantages

```javascript
// Synchronous example
console.log("1");
console.log("2");
console.log("3");
// Output: 1, 2, 3 (in order)

// Asynchronous example
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
// Output: 1, 3, 2 (2 appears after 1 second)
```

#### What is a Callback?

A callback is passing a function as a parameter to another function and calling it after a specific event.

```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "John" };
        callback(data);
    }, 2000);
}

function handleData(data) {
    console.log("Data received:", data);
}

fetchData(handleData); // Prints "data received" after 2 seconds

// Callback Hell example
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                // This structure becomes difficult to read
            });
        });
    });
});
```

#### What is Promise Structure? How Do .then() and .catch() Work?

Promise is a JavaScript object that represents the result of asynchronous operations. It has three states: pending, fulfilled, rejected.

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
        if (success) {
            resolve("Operation successful!");
        } else {
            reject("Operation failed!");
        }
    }, 2000);
});

// Using Promise
myPromise
    .then(result => {
        console.log("Success:", result);
        return "New data"; // For chaining
    })
    .then(newData => {
        console.log("Chaining:", newData);
    })
    .catch(error => {
        console.log("Error:", error);
    })
    .finally(() => {
        console.log("Operation completed");
    });

// Fetch API example
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

#### What Does Async/Await Do? Provide Usage Examples.

Async/await allows writing Promises in a more readable way, similar to synchronous code.

```javascript
// With Promise
function fetchUserData() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(user => {
            return fetch(`/api/posts/${user.id}`);
        })
        .then(response => response.json())
        .catch(error => console.error(error));
}

// With Async/await (cleaner)
async function fetchUserData() {
    try {
        const userResponse = await fetch('/api/user');
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
    }
}

// Parallel operations
async function fetchAllData() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetch('/api/users').then(r => r.json()),
            fetch('/api/posts').then(r => r.json()),
            fetch('/api/comments').then(r => r.json())
        ]);
        
        return { users, posts, comments };
    } catch (error) {
        console.error('Error:', error);
    }
}
```

#### What is Fetch API, How to Fetch Data?

Fetch API is a Web API used to make HTTP requests in modern JavaScript. It is the modern alternative to XMLHttpRequest.

```javascript
// Basic GET request
async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Could not fetch users:', error);
    }
}

// POST request
async function createUser(userData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token123'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('User could not be created');
        }
        
        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage
getUsers().then(users => console.log(users));

createUser({
    name: 'John Doe',
    email: 'john@example.com'
}).then(user => console.log('Created user:', user));
```

---

### 3. Object-Oriented Programming

#### What is a Class, How is it Defined?

A class is a template for objects. It defines properties and behaviors (methods).

```javascript
class Person {
    // Constructor - runs when object is created
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    // Method definition
    introduce() {
        return `Hello, I'm ${this.name}, I'm ${this.age} years old.`;
    }
    
    // Getter
    get info() {
        return `${this.name} (${this.email})`;
    }
    
    // Setter
    set email(newEmail) {
        if (newEmail.includes('@')) {
            this._email = newEmail;
        } else {
            throw new Error('Please enter a valid email address');
        }
    }
    
    get email() {
        return this._email;
    }
    
    // Static method
    static createFromString(str) {
        const [name, age, email] = str.split(',');
        return new Person(name, parseInt(age), email);
    }
}

// Creating object
const person1 = new Person("John", 25, "john@example.com");
console.log(person1.introduce());
console.log(person1.info);

// Static method usage
const person2 = Person.createFromString("Mike,30,mike@example.com");
```

#### Constructor, Method and Property Concepts

**Constructor:** Special method that runs when an object is created
**Property:** Variables that hold the object's characteristics
**Method:** Functions that define the object's behaviors

```javascript
class Car {
    constructor(brand, model, year) {
        // Properties
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.isRunning = false;
        this.speed = 0;
    }
    
    // Methods
    start() {
        this.isRunning = true;
        return `${this.brand} ${this.model} started.`;
    }
    
    stop() {
        this.isRunning = false;
        this.speed = 0;
        return `${this.brand} ${this.model} stopped.`;
    }
    
    accelerate(amount) {
        if (this.isRunning) {
            this.speed += amount;
            return `Speed: ${this.speed} km/h`;
        }
        return "Start the car first!";
    }
    
    getInfo() {
        return {
            brand: this.brand,
            model: this.model,
            year: this.year,
            isRunning: this.isRunning,
            speed: this.speed
        };
    }
}

const myCar = new Car("Toyota", "Corolla", 2022);
console.log(myCar.start());
console.log(myCar.accelerate(50));
console.log(myCar.getInfo());
```

#### What Does the 'this' Keyword Represent?

`this` is a keyword that references the current object within an object. Its value changes according to context.

```javascript
class Student {
    constructor(name, grade) {
        this.name = name;      // This object's name property
        this.grade = grade;    // This object's grade property
    }
    
    study(subject) {
        // this references the object that calls this method
        console.log(`${this.name} is studying ${subject}.`);
    }
    
    getStudentInfo() {
        return {
            name: this.name,
            grade: this.grade
        };
    }
}

const student1 = new Student("Alice", 10);
const student2 = new Student("Bob", 11);

student1.study("Mathematics"); // Alice is studying Mathematics.
student2.study("Physics");     // Bob is studying Physics.

// Arrow function with this problem
class Example {
    constructor() {
        this.value = 42;
    }
    
    // Normal function - this references the object
    normalMethod() {
        console.log(this.value); // 42
    }
    
    // Arrow function - this references the upper scope
    arrowMethod = () => {
        console.log(this.value); // 42
    }
}
```

#### What is Inheritance and How is it Implemented?

Inheritance is when a class inherits properties and methods from another class. The `extends` and `super` keywords are used.

```javascript
// Parent class (Base class)
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.isAlive = true;
    }
    
    eat(food) {
        console.log(`${this.name} is eating ${food}.`);
    }
    
    sleep() {
        console.log(`${this.name} is sleeping.`);
    }
    
    makeSound() {
        console.log(`${this.name} is making a sound.`);
    }
}

// Child class (Derived class)
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Dog"); // Call parent constructor
        this.breed = breed;
        this.isLoyal = true;
    }
    
    // Method override
    makeSound() {
        console.log(`${this.name} is barking: Woof woof!`);
    }
    
    // New method
    wagTail() {
        console.log(`${this.name} is wagging its tail.`);
    }
    
    // Calling parent method
    parentSound() {
        super.makeSound(); // Calls makeSound from Animal class
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name, "Cat");
        this.color = color;
        this.livesLeft = 9;
    }
    
    makeSound() {
        console.log(`${this.name} is meowing: Meow!`);
    }
    
    climb() {
        console.log(`${this.name} is climbing.`);
    }
}

// Usage
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Black");

dog.eat("bone");      // Parent method
dog.makeSound();      // Overridden method
dog.wagTail();        // Child method

cat.eat("fish");      // Parent method
cat.makeSound();      // Overridden method
cat.climb();          // Child method
```

#### Create a Real-Life Class Example (e.g., User, Product, Task)

```javascript
// Task Management System Example

class Task {
    static taskCounter = 0;
    static priorities = {
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3,
        URGENT: 4
    };
    
    constructor(title, description, priority = Task.priorities.MEDIUM) {
        this.id = ++Task.taskCounter;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = 'pending';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.assignedTo = null;
        this.dueDate = null;
    }
    
    // Complete the task
    complete() {
        this.status = 'completed';
        this.updatedAt = new Date();
        console.log(`Task "${this.title}" completed!`);
    }
    
    // Assign task to someone
    assignTo(user) {
        this.assignedTo = user;
        this.updatedAt = new Date();
        console.log(`Task "${this.title}" assigned to ${user.name}.`);
    }
    
    // Set due date
    setDueDate(date) {
        this.dueDate = new Date(date);
        this.updatedAt = new Date();
    }
    
    // Get priority level as string
    getPriorityText() {
        const priorities = Object.entries(Task.priorities);
        const found = priorities.find(([name, value]) => value === this.priority);
        return found ? found[0] : 'UNKNOWN';
    }
    
    // Get task information
    getInfo() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.getPriorityText(),
            status: this.status,
            assignedTo: this.assignedTo?.name || 'Unassigned',
            dueDate: this.dueDate?.toLocaleDateString() || 'Not set',
            createdAt: this.createdAt.toLocaleDateString()
        };
    }
}

class User {
    constructor(name, email, role = 'user') {
        this.id = Date.now();
        this.name = name;
        this.email = email;
        this.role = role;
        this.tasks = [];
        this.createdAt = new Date();
    }
    
    // Accept task
    acceptTask(task) {
        task.assignTo(this);
        this.tasks.push(task);
        console.log(`${this.name} accepted task "${task.title}".`);
    }
    
    // List tasks
    listTasks() {
        console.log(`${this.name}'s tasks:`);
        this.tasks.forEach(task => {
            console.log(`- ${task.title} (${task.status})`);
        });
    }
    
    // Get completed task count
    getCompletedTasksCount() {
        return this.tasks.filter(task => task.status === 'completed').length;
    }
}

class Project {
    constructor(name, description) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.tasks = [];
        this.team = [];
        this.createdAt = new Date();
        this.status = 'active';
    }
    
    // Add task to project
    addTask(title, description, priority) {
        const task = new Task(title, description, priority);
        this.tasks.push(task);
        console.log(`"${title}" task added to project.`);
        return task;
    }
    
    // Add team member to project
    addTeamMember(user) {
        this.team.push(user);
        console.log(`${user.name} added to project.`);
    }
    
    // Project statistics
    getStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
        const pendingTasks = totalTasks - completedTasks;
        
        return {
            projectName: this.name,
            totalTasks,
            completedTasks,
            pendingTasks,
            completionRate: totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(1) + '%' : '0%',
            teamSize: this.team.length
        };
    }
}

// Usage Example
const project = new Project("Website Development", "Corporate website project");

const developer = new User("John Smith", "john@example.com", "developer");
const designer = new User("Jane Doe", "jane@example.com", "designer");
const manager = new User("Mike Johnson", "mike@example.com", "manager");

project.addTeamMember(developer);
project.addTeamMember(designer);
project.addTeamMember(manager);

const task1 = project.addTask("Homepage design", "Create homepage mockup", Task.priorities.HIGH);
const task2 = project.addTask("Database design", "Create database schema", Task.priorities.MEDIUM);
const task3 = project.addTask("API development", "Develop REST API endpoints", Task.priorities.HIGH);

designer.acceptTask(task1);
developer.acceptTask(task2);
developer.acceptTask(task3);

task1.setDueDate("2025-01-15");
task1.complete();

task2.setDueDate("2025-01-20");

console.log("\n--- Project Statistics ---");
console.log(project.getStats());

console.log("\n--- Task Details ---");
project.tasks.forEach(task => {
    console.log(task.getInfo());
});

console.log("\n--- User Tasks ---");
developer.listTasks();
```
