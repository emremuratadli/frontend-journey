# Research Task

**Topic:** JavaScript Fundamentals, Variables, Conditions, Functions and DOM

## Research Questions:

### 1. What is JavaScript?
JavaScript is a programming language that adds interactivity and dynamic features to web pages.

**Key Features:**
- **Client-Side:** Runs in browser
- **Interpreted:** No compilation needed
- **Dynamic Typing:** Variable types determined at runtime
- **Object-Oriented:** Prototype-based system
- **Event-Driven:** Event-based programming

**Relationship with HTML & CSS:**
- HTML creates structure
- CSS handles styling
- JavaScript controls behavior

### 2. What are variable declaration methods?

JavaScript has 3 variable declaration methods:

#### `var` (Old Method)
```javascript
var name = "John";
```
- Function scope
- Hoisting support
- Can be redeclared

#### `let` (Modern Method)
```javascript
let city = "Istanbul";
```
- Block scope
- Can be reassigned
- Safer option

#### `const` (Constants)
```javascript
const PI = 3.14;
```
- Block scope
- Cannot be changed
- Must be initialized

### 3. What are data types?

#### Primitive Types
- **string:** `"Hello"`
- **number:** `25` or `3.14`
- **boolean:** `true` or `false`
- **null:** `null`
- **undefined:** `undefined`

#### Non-Primitive Types
- **object:** `{name: "Ali", age: 30}`
- **array:** `["red", "blue", "green"]`
- **function:** `function() { return "Hi"; }`

### 4. How do conditional structures work?

#### if-else Structure
```javascript
if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}
```

#### switch Statement
```javascript
switch(grade) {
    case "A":
        console.log("Excellent");
        break;
    case "B":
        console.log("Good");
        break;
    default:
        console.log("Try harder");
}
```

**Examples with operators:**
- `&&` (AND), `||` (OR), `!` (NOT)
- Ternary operator: `age >= 18 ? "Adult" : "Minor"`

### 5. How are functions defined and used?

#### Function Declaration
```javascript
function greet(name) {
    return `Hello ${name}!`;
}
```

#### Function Expression
```javascript
const add = function(a, b) {
    return a + b;
};
```

#### Arrow Functions
```javascript
const multiply = (a, b) => a * b;
```

**Key Differences:**
- **Normal functions:** Can be hoisted, have `this` context
- **Arrow functions:** Cannot be hoisted, inherit `this` from parent scope

### 6. What are loops and where are they used?

#### for Loop
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

#### while Loop
```javascript
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}
```

#### do...while Loop
```javascript
do {
    console.log("Runs at least once");
} while (false);
```

#### forEach for Arrays
```javascript
const colors = ["red", "blue", "green"];
colors.forEach(color => console.log(color));
```

### 7. What is DOM and where is it used?

DOM (Document Object Model) allows JavaScript to interact with HTML elements.

#### Basic DOM Methods
```javascript
// Select elements
const element = document.getElementById("myId");
const elements = document.querySelector(".myClass");

// Change content
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";
element.innerText = "Visible text only";

// Get/Set form values
const input = document.querySelector("input");
input.value = "New input value";
const inputValue = input.value;

// Add event listeners
element.addEventListener("click", function() {
    alert("Clicked!");
});

// Create and add elements
const newDiv = document.createElement("div");
newDiv.textContent = "New element";
document.body.appendChild(newDiv);
```

**Key DOM Methods:**
- `getElementById()` - Select element by ID
- `querySelector()` - Select element by CSS selector
- `innerText` - Get/set visible text content
- `addEventListener()` - Handle events (click, submit, etc.)
- `value` - Get/set form input values

