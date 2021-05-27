const body = document.body;
const h = document.createElement('h2');
const newInput = document.createElement('input');
      newInput.className = 'new-input';

body.appendChild(h);
body.appendChild(newInput);

let newTimer;

newInput.addEventListener('input', () => {
  clearTimeout(newTimer);

  newTimer = setTimeout(() => {
    h.textContent = newInput.value;
  }, 300);
})

