function add(a, b) {
    return a + b;
  }

  function sub(a,b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b === 0) {
      return "Cannot divide by zero.";
    }
    return a / b;
  }
  
  function operate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case 'add':
        return add(firstOperand, secondOperand);
      case 'sub':
        return sub(firstOperand, secondOperand);
      case 'multiply':
        return multiply(firstOperand, secondOperand);
      case 'divide':
        return divide(firstOperand, secondOperand);
      default:
        return 'Error: Invalid operator';
    }
  }

  



 let calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

document.addEventListener('DOMContentLoaded', function() {
  // Get references to the buttons and display
  const buttons = document.querySelectorAll('.btn');
  const display = document.querySelector('#display');

  // Add click event listeners to each button
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
});

  // Function to handle button click events
  function handleButtonClick(e) {
    const value = e.target.innerText;

    if (value === 'C') {
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      const operatorMap = {
        '+': 'add',
        '-': 'sub',
        '*': 'multiply',
        '/': 'divide'
      };
      if (calculator.firstOperand !== null && calculator.operator !== null) {
        const result = operate(calculator.firstOperand, parseFloat(calculator.displayValue), calculator.operator);
        if (typeof result === 'string') {
          calculator.displayValue = result;
          calculator.firstOperand = null;
          calculator.waitingForSecondOperand = false;
          calculator.operator = null;
        } else {
          calculator.displayValue = result;
          calculator.firstOperand = result;
          calculator.waitingForSecondOperand = false;
          calculator.operator = operatorMap[value];
        }
      } else {
        calculator.firstOperand = parseFloat(calculator.displayValue);
        calculator.waitingForSecondOperand = true;
        calculator.operator = operatorMap[value];
      }
    } else if (value === '=') {
      if (calculator.firstOperand !== null && calculator.operator !== null) {
        const result = operate(calculator.firstOperand, parseFloat(calculator.displayValue), calculator.operator);
        if (typeof result === 'string') {
          calculator.displayValue = result;
        } else {
          calculator.displayValue = result;
        }

        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
      }
    } else {
      if (calculator.displayValue === '0' || calculator.waitingForSecondOperand) {
        calculator.displayValue = value;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.displayValue += value;
      }
    }

    display.value = calculator.displayValue;
  }
