let input = document.querySelector('input');
let btn = document.querySelector('.enter-btn');
let timer = document.querySelector('.timer');

let intervalId;

btn.addEventListener('click', () => {
  timer.innerHTML = input.value
  cancel()

   intervalId = setInterval(() => {
    run()
    if (timer.innerHTML == 0) {
      clearInterval(intervalId)
    }
  }, 1000);

})

let run = () => {
  timer.innerHTML = --timer.innerHTML;
}

let cancel = () => {
  clearInterval(intervalId);
}
