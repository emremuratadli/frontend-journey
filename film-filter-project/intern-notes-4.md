# JavaScript Array Functions

## Research Questions:

### What are they used for?
JavaScript array functions are built-in methods used to perform operations on arrays. They simplify data manipulation, filtering, and transformation operations.

### How to use them?
```javascript
array.methodName((element, index, array) => {
    // operations
});
```

### Example code block:
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers); // [2, 4]
```

## 2. Methods to Study:

### .forEach()
- **Description:** Executes a specified function for each array element
- **Example:** 
```javascript
[1,2,3].forEach(number => console.log(number)); // prints 1, 2, 3
```

### .map()
- **Description:** Creates a new array by transforming each element
- **Example:** 
```javascript
[1,2,3].map(x => x * 2); // [2, 4, 6]
```

### .filter()
- **Description:** Creates a new array with elements that meet a condition
- **Example:** 
```javascript
[1,2,3,4].filter(x => x > 2); // [3, 4]
```

### .find()
- **Description:** Returns the first element that meets a condition
- **Example:** 
```javascript
[1,2,3].find(x => x > 1); // 2
```

### .some()
- **Description:** Returns true if at least one element meets the condition
- **Example:** 
```javascript
[1,2,3].some(x => x > 2); // true
```

### .every()
- **Description:** Returns true if all elements meet the condition
- **Example:** 
```javascript
[2,4,6].every(x => x % 2 === 0); // true
```

### .reduce()
- **Description:** Reduces all elements to a single value
- **Example:** 
```javascript
[1,2,3].reduce((sum, number) => sum + number, 0); // 6
```

### .includes()
- **Description:** Checks if a specified value exists in the array
- **Example:** 
```javascript
[1,2,3].includes(2); // true
```

### .sort()
- **Description:** Sorts the array (modifies the original array)
- **Example:** 
```javascript
[3,1,2].sort(); // [1, 2, 3]
```

### .flat()
- **Description:** Flattens nested arrays
- **Example:** 
```javascript
[1, [2, 3], 4].flat(); // [1, 2, 3, 4]
```
