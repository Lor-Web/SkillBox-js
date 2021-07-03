window.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
  const drop = document.querySelector('.drop-menu');

  document.addEventListener('click', function (event) {
    const openDrop = (event.target === dropdown) ? false : dropdown.contains(event.target);

    if (openDrop) {
      drop.style.display = 'block';
    } else {
      drop.style.display = 'none';
    }
  })
});
