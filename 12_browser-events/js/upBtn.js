const upBtn = document.querySelector('.up-btn');

window.addEventListener('scroll', () => {
  if (this.pageYOffset > 100) {
    upBtn.style.display = 'block';
  }
  else {
    upBtn.style.display = 'none';
  }
}, true)

upBtn.addEventListener('click', () => {
  this.scrollTo({top: 0, behavior: 'smooth'})
})

