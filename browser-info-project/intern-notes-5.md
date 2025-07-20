# JavaScript String Methods and Browser APIs


### 1. JavaScript String Methods
String manipulation is a commonly used operation in web development. This section covers fundamental string methods and their usage areas.

### 2. Detailed Analysis of String Methods

#### .length
- **Purpose:** Returns the number of characters in the string
- **Usage:** `string.length`
- **Example:** 
```javascript
let text = "Hello";
console.log(text.length); // 5
```

#### .toUpperCase()
- **Purpose:** Converts all letters to uppercase
- **Usage:** `string.toUpperCase()`
- **Example:**
```javascript
let text = "hello world";
console.log(text.toUpperCase()); // "HELLO WORLD"
```

#### .toLowerCase()
- **Purpose:** Converts all letters to lowercase
- **Usage:** `string.toLowerCase()`
- **Example:**
```javascript
let text = "HELLO WORLD";
console.log(text.toLowerCase()); // "hello world"
```

#### .slice()
- **Purpose:** Extracts a specific portion from the string
- **Usage:** `string.slice(start, end)`
- **Example:**
```javascript
let text = "JavaScript";
console.log(text.slice(0, 4)); // "Java"
console.log(text.slice(-6)); // "Script"
```

#### .substring()
- **Purpose:** Returns characters between specified indexes
- **Usage:** `string.substring(start, end)`
- **Example:**
```javascript
let text = "JavaScript";
console.log(text.substring(4, 10)); // "Script"
```

#### .substr()
- **Purpose:** Returns specified number of characters from a specified position (deprecated)
- **Usage:** `string.substr(start, length)`
- **Example:**
```javascript
let text = "JavaScript";
console.log(text.substr(4, 6)); // "Script"
```

#### .indexOf()
- **Purpose:** Returns the index of the first occurrence of a specified value
- **Usage:** `string.indexOf(searchValue)`
- **Example:**
```javascript
let text = "JavaScript programming";
console.log(text.indexOf("Script")); // 4
console.log(text.indexOf("Python")); // -1
```

#### .lastIndexOf()
- **Purpose:** Returns the index of the last occurrence of a specified value
- **Usage:** `string.lastIndexOf(searchValue)`
- **Example:**
```javascript
let text = "JavaScript and Java";
console.log(text.lastIndexOf("Java")); // 15
```

#### .includes()
- **Purpose:** Checks whether the string contains a specified value
- **Usage:** `string.includes(searchValue)`
- **Example:**
```javascript
let text = "JavaScript programming";
console.log(text.includes("Script")); // true
console.log(text.includes("Python")); // false
```

#### .replace()
- **Purpose:** Replaces the first matching value with a new value
- **Usage:** `string.replace(oldValue, newValue)`
- **Example:**
```javascript
let text = "JavaScript is great";
console.log(text.replace("JavaScript", "Python")); // "Python is great"
```

#### .replaceAll()
- **Purpose:** Replaces all matching values with a new value
- **Usage:** `string.replaceAll(oldValue, newValue)`
- **Example:**
```javascript
let text = "JavaScript and JavaScript";
console.log(text.replaceAll("JavaScript", "Python")); // "Python and Python"
```

#### .trim()
- **Purpose:** Removes whitespace from both ends
- **Usage:** `string.trim()`
- **Example:**
```javascript
let text = "  JavaScript  ";
console.log(text.trim()); // "JavaScript"
```

#### .trimStart()
- **Purpose:** Removes whitespace only from the beginning
- **Usage:** `string.trimStart()`
- **Example:**
```javascript
let text = "  JavaScript  ";
console.log(text.trimStart()); // "JavaScript  "
```

#### .trimEnd()
- **Purpose:** Removes whitespace only from the end
- **Usage:** `string.trimEnd()`
- **Example:**
```javascript
let text = "  JavaScript  ";
console.log(text.trimEnd()); // "  JavaScript"
```

#### .split()
- **Purpose:** Splits the string by specified separator and returns an array
- **Usage:** `string.split(separator)`
- **Example:**
```javascript
let text = "apple,orange,banana";
console.log(text.split(",")); // ["apple", "orange", "banana"]
```

#### .concat()
- **Purpose:** Concatenates strings
- **Usage:** `string.concat(otherString)`
- **Example:**
```javascript
let text1 = "Hello";
let text2 = " World";
console.log(text1.concat(text2)); // "Hello World"
```

### 3. Browser APIs and Window Object
Access to browser information in modern web applications is critical for optimizing user experience. This section examines navigator and screen objects.

#### window.navigator Object
The Navigator object is a fundamental API that provides information about the browser and user system.
- **Function:** Provides browser and operating system information
- **Use Cases:** Feature detection, analytics, compatibility checks
- **Example Usage:**
```javascript
console.log(navigator.userAgent); // Browser information
console.log(navigator.language); // Language setting
```

#### navigator.userAgent
- **Purpose:** Returns the browser's user agent string
- **Example:**
```javascript
console.log(navigator.userAgent);
// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
```

#### navigator.language
- **Purpose:** Returns the browser's language setting
- **Example:**
```javascript
console.log(navigator.language); // "en-US" or "tr-TR"
```

#### navigator.platform
- **Purpose:** Returns operating system platform information
- **Example:**
```javascript
console.log(navigator.platform); // "Win32", "MacIntel", "Linux x86_64"
```

#### navigator.onLine
- **Purpose:** Checks the internet connection status
- **Example:**
```javascript
console.log(navigator.onLine); // true or false
```

#### navigator.hardwareConcurrency
- **Purpose:** Returns the number of CPU cores
- **Example:**
```javascript
console.log(navigator.hardwareConcurrency); // 4, 8, 16, etc.
```

#### navigator.deviceMemory
- **Purpose:** Returns the device's RAM amount (GB)
- **Example:**
```javascript
console.log(navigator.deviceMemory); // 4, 8, 16, etc.
```

#### navigator.geolocation
- **Purpose:** Used to obtain location information
- **Example:**
```javascript
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
});
```

#### navigator.cookieEnabled
- **Purpose:** Checks whether cookie support is active in the browser
- **Example:**
```javascript
console.log(navigator.cookieEnabled); // true or false
```

#### navigator.permissions
- **Purpose:** Controls browser permissions
- **Example:**
```javascript
navigator.permissions.query({name: 'camera'}).then((result) => {
    console.log(result.state); // "granted", "denied", "prompt"
});
```

#### window.screen Object
The Screen object provides access to user screen properties and offers important information for responsive design.
- **Function:** Provides screen dimensions and properties
- **Use Cases:** Responsive design, screen compatibility, display optimization

#### screen.width / screen.height
- **Purpose:** Returns the total width and height of the screen
- **Example:**
```javascript
console.log(screen.width, screen.height); // 1920, 1080
```

#### window.innerWidth / window.innerHeight
- **Purpose:** Returns the inner dimensions of the browser window
- **Example:**
```javascript
console.log(window.innerWidth, window.innerHeight); // 1200, 800
```

#### screen.availWidth / screen.availHeight
- **Purpose:** Returns available screen area excluding taskbar
- **Example:**
```javascript
console.log(screen.availWidth, screen.availHeight); // 1920, 1040
```

#### screen.colorDepth
- **Purpose:** Returns the color depth (bits) of the screen
- **Example:**
```javascript
console.log(screen.colorDepth); // 24
```

#### screen.orientation.type
- **Purpose:** Returns screen orientation (for mobile devices)
- **Example:**
```javascript
console.log(screen.orientation.type); // "portrait-primary", "landscape-primary"
```

## References
- [MDN Web Docs - String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [MDN Web Docs - Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
- [MDN Web Docs - Screen](https://developer.mozilla.org/en-US/docs/Web/API/Screen)
