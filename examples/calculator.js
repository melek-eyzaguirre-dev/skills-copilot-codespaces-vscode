/**
 * Simple Calculator Example
 * 
 * This example demonstrates how GitHub Copilot can help you build
 * a basic calculator with various operations.
 */

// Add two numbers
function add(a, b) {
  return a + b;
}

// Subtract two numbers
function subtract(a, b) {
  return a - b;
}

// Multiply two numbers
function multiply(a, b) {
  return a * b;
}

// Divide two numbers with error handling for division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

// Calculate the power of a number
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Calculate the square root of a number
function squareRoot(number) {
  if (number < 0) {
    throw new Error("Cannot calculate square root of negative number");
  }
  return Math.sqrt(number);
}

// Calculate the percentage of a number
function percentage(number, percent) {
  return (number * percent) / 100;
}

// Calculate the average of an array of numbers
function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Find the median of an array of numbers
function median(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}

// Round a number to specified decimal places
function roundTo(number, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
}

// Example usage
console.log("Calculator Examples:");
console.log("Add: 5 + 3 =", add(5, 3));
console.log("Subtract: 10 - 4 =", subtract(10, 4));
console.log("Multiply: 6 * 7 =", multiply(6, 7));
console.log("Divide: 20 / 4 =", divide(20, 4));
console.log("Power: 2^8 =", power(2, 8));
console.log("Square Root: √16 =", squareRoot(16));
console.log("Percentage: 20% of 150 =", percentage(150, 20));
console.log("Average: [10, 20, 30, 40] =", average([10, 20, 30, 40]));
console.log("Median: [1, 3, 5, 7, 9] =", median([1, 3, 5, 7, 9]));
console.log("Round: 3.14159 to 2 decimals =", roundTo(3.14159, 2));

// Export functions for use in other modules
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  power,
  squareRoot,
  percentage,
  average,
  median,
  roundTo
};
