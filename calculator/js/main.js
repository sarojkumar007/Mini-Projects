// HELPER FUNCTIONS

function addToDisplay(key) {
  if (document.querySelector('.display').innerText !== 'Invalid Expression') {
    document.querySelector('.display').innerText += key;
  }
}

function evaluate() {
  let data = document.querySelector('.display').innerText;
  if (data && data !== "Invalid Expression") {
    try {
      document.querySelector('.display').innerText = eval(data);
      document.querySelector('.his').innerText = data;
    }
    catch (err) {
      document.querySelector('.display').innerText = "Invalid Expression";
    }
  }
}

function clearDisplay() {
  document.querySelector('.display').innerText = "";
  document.querySelector('.his').innerText = "";
}

function delDisplay() {
  let data = document.querySelector('.display').innerText;
  if (data && data !== "Invalid Expression") {
    document.querySelector('.display').innerText = data.slice(0, -1)
  } else {
    document.querySelector('.display').innerText = ""
  }
}

// MAIN

window.addEventListener('keyup', (e) => {
  const acceptedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', '%', '(', ')'];
  // console.log(e)
  // Add to Display
  if (acceptedKeys.includes(e.key)) {
    addToDisplay(e.key)
  }
  // Clear Display
  if (e.key === 'c') {
    clearDisplay();
  }
  // Delete from Display
  if (e.key === 'Backspace' || e.key === 'Delete') {
    delDisplay();
  }

  // Evaluate
  if (e.key === 'Enter') {
    evaluate();
  }

})

document.querySelectorAll('.val_btn').forEach(item => {
  item.addEventListener('click', e => {
    addToDisplay(e.target.dataset.val);
  })
})

document.querySelector('.eq_btn').addEventListener('click', evaluate);

document.querySelector('.ac_btn').addEventListener('click', clearDisplay);

document.querySelector('.del_btn').addEventListener('click', delDisplay);