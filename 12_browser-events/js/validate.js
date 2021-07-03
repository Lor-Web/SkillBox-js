window.addEventListener('DOMContentLoaded', () => {
  const validateInput = document.querySelectorAll('.js-input');
  const validateBtn = document.querySelector('.btn-input');
  const regexp = /[а-яА-ЯЁё\s-]/i;

  validateInput.forEach(item => item.addEventListener('keypress', event => {
    if (!regexp.test(event.key)) {
      event.preventDefault()
    }
  }))

  validateInput.forEach(item => item.addEventListener('blur', function (event) {
    let newValue = event.target.value
    newValue = newValue.replace(/[^а-яА-ЯЁё\s\-]/gi, '');
    newValue = newValue.replace(/^[\s\-]+/g, '');
    newValue = newValue.replace(/[\s\-]+$/g, '');
    newValue = newValue.replace(/\s{2,}/g, ' ');
    newValue = newValue.replace(/\-{2,}/g, '-');
    newValue = newValue.toLowerCase();


    this.value = toUpperFirstSymbol(newValue)
  }))

  validateBtn.addEventListener('click', function (event) {
    event.preventDefault()
    const validateInput = document.querySelectorAll('.js-input');
    const validateDiv = document.querySelector('.alert');

    if (validateInput[0].value.length === 0 || validateInput[1].value.length === 0 || validateInput[2].value.length === 0) {
      validateDiv.style.opacity = '1';
    }
    else {
      validateDiv.style.opacity = '0';

      const listValues = document.querySelector('.list-group');
      const newItem = document.createElement('a');
      newItem.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-light');
      // newItem.setAttribute('href', '#');
      newItem.textContent = `${validateInput[0].value} ${validateInput[1].value} ${validateInput[2].value}`;
      listValues.appendChild(newItem);

      validateInput.forEach(input => input.value = '');
    }
  })

  function toUpperFirstSymbol(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

})
