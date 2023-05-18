
const screen = document.getElementById('field');
screen.textContent = 0;
const numpad = document.querySelectorAll('.white');
const fieldscreen = document.getElementById('field-sign');
const controls = document.querySelectorAll('.orange');
let startOver = false;
let screenvalue = '';
let sign = '';

for (let i = 0; i < numpad.length; i++) {
  numpad[i].addEventListener('click', () => {
    populate(numpad[i]);
  });
}

document.addEventListener('keydown', function (event) {
  for (let i = 0; i < numpad.length; i++) {
    if (numpad[i].textContent == event.key)
      populate(numpad[i]);

    else if (event.key == 'Backspace')
      screen.textContent = 0;

    else if (event.key == 'enter') {
      fieldscreen.textContent = '=';
      operate(sign, screenvalue, screen.textContent);
      screenvalue = screen.textContent;
      sign = '';
    }
  }
});

for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener('click', () => {
    if (controls[i].textContent == 'AC')
      clearScreen();

    else if (controls[i].textContent == '+/-')
      changeSign();

    else if (controls[i].textContent == '%')
      percent();

    else if (controls[i].textContent == 'x')
      evaluate('x');

    else if (controls[i].textContent == '÷')
      evaluate('÷');

    else if (controls[i].textContent == '-')
      evaluate('-');

    else if (controls[i].textContent == '=') {
      fieldscreen.textContent = '=';
      operate(sign, screenvalue, screen.textContent);
      screenvalue = screen.textContent;
      sign = '';
    }
  });
}

function add(a, b) {
  a = +(a);
  b = +(b);
  let result = (a + b).toString();
  screen.textContent = convert(result);
}

function subtract(a, b) {
  let result = (a - b).toString();
  screen.textContent = convert(result);
}

function multiply(a, b) {
  let result = (a * b).toString();
  screen.textContent = convert(result);
}

function divide(a, b) {
  if (b == 0) {
    clearScreen();
    fieldscreen.textContent = 'Error';
  } else {
    let result = (a / b).toString();
    screen.textContent = convert(result);
  }
}

function percent() {
  screen.textContent = screen.textContent / 100;
  screenvalue = screen.textContent;
}

function changeSign() {
  screen.textContent *= -1;
  screenvalue = screen.textContent;
}

function clearScreen() {
  sign = '';
  screenvalue = 0;
  fieldscreen.textContent = '';
  screen.textContent = 0;
  startOver = false;
}

function operate(operator, a, b) {
  if (operator == '+') {
    add(a, b);
  } else if (operator == '-') {
    subtract(a, b);
  } else if (operator == 'x') {
    multiply(a, b);
  } else if (operator == '%') {
    percent(a);
  } else if (operator == '') {
    divide(a, b);
  }
  startOver = true;
}

function populate(btn) {
  if (startOver) {
    screen.textContent = 0;
    startOver = false;
  }

  if (screen.textContent == 0) {
    if (btn.textContent == '.') {
      checkForCompliance(btn);
    } else if (screen.textContent.length > 1) {
      screen.textContent += btn.textContent;
    } else {
      screen.textContent = btn.textContent;
    }
  } else {
    checkForCompliance(btn);
  }
}

function checkForCompliance(btn) {
  if (screen.textContent.length >= 11) {
    return;
  }

  if (screen.textContent.includes('.') && btn.textContent == '.') {
    return;
  } else {
    screen.textContent += btn.textContent;
  }
}

function evaluate(operator) {
  fieldscreen.textContent = operator;
  if (sign == operator) {
    operate(sign, screenvalue, screen.textContent);
    screenvalue = screen.textContent;
  } else if (!sign) {
    sign = operator;
    screenvalue = screen.textContent;
    startOver = true;
  } else {
    operate(sign, screenvalue, screen.textContent);
    sign = operator;
    screenvalue = screen.textContent;
  }
}

function convert(result) {
  if (result.length > 9) {
    result = parseFloat(result);
    return result.toExponential(1);
  } else {
    return result;
  }
}
