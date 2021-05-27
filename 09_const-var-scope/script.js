const cards = [
  {
    name: "js",
    img: `./img/js.jpg`,
  },
  {
    name: "vue",
    img: `./img/vue.jpg`,
  },
  {
    name: "html",
    img: `./img/html.jpg`,
  },
  {
    name: "css",
    img: `./img/css.jpg`,
  },
  {
    name: "react",
    img: `./img/react.png`,
  },
  {
    name: "gitlab",
    img: `./img/gitlab.jpg`,
  },
  {
    name: "jquery",
    img: `./img/jq.png`,
  },
  {
    name: "webpack",
    img: `./img/webpack.jpg`,
  },
  {
    name: "git",
    img: `./img/git.png`,
  },
  {
    name: "skillbox",
    img: `./img/skillbox.jpg`,
  },
];

const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const input = document.querySelector("input");
const btn = document.querySelector("button");
let intervalId;

btn.addEventListener("click", () => {
  let number = input.value;
  number = number.replace(/\s+/g, " ").trim();
  number = Number(number);

  if (
    number == 2 ||
    number == 4 ||
    number == 6 ||
    number == 8 ||
    number == 10
  ) {
    popup.classList.add("no-activ");
    createGame(number);
  } else {
    alert("Вы ввели недопустимое значение!");
    input.value = "";
  }
});

const createGame = (num) => {
  let timer = document.createElement("div");
  timer.classList.add("timer");
  let min = 60;
  body.appendChild(timer);
  const newCards = shuffle(cards);
  const valueCards = num;

  createCards();
  cancel();

  function createCards() {
    let coupleCards = newCards.slice(0, valueCards);
    let coupleCards2 = newCards.slice(0, valueCards);
    coupleCards = shuffle(coupleCards.concat(coupleCards2));

    for (i = 0; i < coupleCards.length; i++) {
      let card = document.createElement("div");
      let shirt = document.createElement("div");
      let picture = document.createElement("img");
      card.classList.add("card");
      shirt.classList.add("shirt");
      picture.classList.add("value");

      body.appendChild(card);
      card.appendChild(shirt);
      card.appendChild(picture);
      picture.setAttribute("src", `${coupleCards[i].img}`);
    }
  }

  intervalId = setInterval(() => {
    run();
    if (timer.innerHTML == 0) {
      clearInterval(intervalId);
      let what = confirm("Игра окончена. Сыграть еще раз?");
      gameOver(what);
    }
  }, 1000);
  const shirt = document.querySelectorAll(".shirt");
  const openCards = [];
  const indxCards = [];
  let points = 0;

  shirt.forEach((el) => {
    el.addEventListener("click", () => {
      cardName = el.nextElementSibling.getAttribute("src");
      let arr = Array.from(shirt);
      let indx = arr.indexOf(el);

      if (openCards.length === 0) {
        $(el).animate({ width: 0 }, "slow");

        indxCards.push(indx);
        openCards.push(cardName);
      } else if (
        openCards.length != 0 &&
        cardName === openCards[openCards.length - 1]
      ) {
        $(el).animate({ width: 0 }, "slow");

        indxCards.splice(0);
        openCards.splice(0);
        points++;
      }
      if (
        openCards.length != 0 &&
        cardName != openCards[openCards.length - 1]
      ) {
        $(el).animate({ width: 0 }, "slow");
        $(el).animate({ width: 250 }, "slow");
        $(shirt[indxCards[indxCards.length - 1]]).animate(
          { width: 250 },
          "slow"
        );
        indxCards.splice(0);
        openCards.splice(0);
      }

      if (valueCards === points) {
        $(el).animate({ width: 0 }, "slow");
        cancel();

        timer.innerHTML = `Поздравляем, ваше время: ${
          60 - timer.innerHTML
        } сек.`;

        let divBtn = document.createElement("div");
        let newBtn = document.createElement("button");
        divBtn.classList.add("newBtn");
        newBtn.innerHTML = "Сыграть еще раз?";
        body.appendChild(divBtn);
        divBtn.appendChild(newBtn);

        newBtn.addEventListener("click", () => {
          gameOver(true);
          body.removeChild(divBtn);
        });
      }
    });

    return points;
  });

  function run() {
    timer.innerHTML = --min;
  }

  function cancel() {
    clearInterval(intervalId);
  }

  function gameOver(what) {
    const game = what;

    let cards = document.querySelectorAll(".card");
    cards.forEach((el) => {
      body.removeChild(el);
    });
    cancel();
    body.removeChild(timer);

    if (game === true) {
      popup.classList.remove("no-activ");
    } else {
      let pointsBar = document.createElement("div");
      pointsBar.classList.add("points");
      body.appendChild(pointsBar);

      if (points <= 2) {
        pointsBar.innerHTML = `Очков набрано: ${points}.
        Тебе еще нужно потренироваться :(`;
      } else if (points <= 3) {
        pointsBar.innerHTML = `Очков набрано: ${points}.
        Можешь лучше!`;
      } else if (points <= 5) {
        pointsBar.innerHTML = `Очков набрано: ${points}.
        Отлично! :)`;
      }
    }
  }

  function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
};
