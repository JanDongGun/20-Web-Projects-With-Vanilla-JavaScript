const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// FUNCTION
//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}

// show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// cheack email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// check required

function checkRequired(inputArr) {
  inputArr.forEach((el) => {
    if (el.value.trim() === '') {
      // trim() Remove whitespace from both sides of a string
      showError(el, `${getFieldName(el)} is required`);
    } else {
      showSuccess(el);
    }
  });
}

// getFieldName

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check length

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
}

// check match password
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 20);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
