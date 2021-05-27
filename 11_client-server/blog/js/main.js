const body = document.querySelector("body");
const ul = document.querySelector(".news");
const postItem = document.querySelector(".item-post");
const commentsList = document.querySelector(".comments-list");
const nowUrl = document.location.href;
let url = "https://gorest.co.in/public-api/posts";
let newUrl = url + "?page=";
let numberLastPage;
let arrNews = [];

window.addEventListener("DOMContentLoaded", () => {
  if (nowUrl.includes("index.html")) {
    requestNews(url);
    updateURL(1);
  } else if (nowUrl.includes("post.html")) {
    const postUrl = "https://gorest.co.in/public-api/posts/";
    const commentUrl = "https://gorest.co.in/public-api/comments?post_id=";
    const nowUrl = document.location.href;
    const newsIdUrl = nowUrl.split("=")[1];

    requestPost(`${postUrl + newsIdUrl}`, `${commentUrl + newsIdUrl}`);
  }
});

//Делаем запрос на сервер, получаем овтет и заполняем сайт
function requestNews(url) {
  const request = fetch(url);
  request
    .then((response) => {
      return response.json();
    })
    .then((posts) =>
      posts.data.forEach((post) => {
        arrNews = posts.data.slice();
        appendNews(post.id, post.title, post.body);
        numberLastPage = posts.meta.pagination.pages;
      })
    )
    .then((allNews) => getNews());
}
/////////////

//Делаем запрос на сервер, чтобы получить полный пост
function requestPost(urlPost, urlComments) {
  const requestPost = fetch(urlPost);
  requestPost
    .then((response) => {
      return response.json();
    })
    .then((post) => {
      const itemTitle = document.createElement("h2");
      itemTitle.classList.add("item-title");
      const itemBody = document.createElement("p");
      itemBody.classList.add("item-body");

      itemTitle.innerText = post.data.title;
      itemBody.innerText = post.data.body;

      postItem.appendChild(itemTitle);
      postItem.appendChild(itemBody);
    });

  const requestComments = fetch(urlComments);
  requestComments
    .then((response) => {
      return response.json();
    })
    .then((comment) => {
      comment.data.forEach((comment) => {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment-item");
        const commentTitle = document.createElement("div");
        commentTitle.classList.add("comment-title");
        const commentAuthor = document.createElement("span");
        commentAuthor.classList.add("comment-author");
        const commentMail = document.createElement("span");
        commentMail.classList.add("comment-mail");
        const commentText = document.createElement("p");
        commentText.classList.add("comment-text");

        commentItem.appendChild(commentTitle);
        commentTitle.appendChild(commentAuthor);
        commentTitle.appendChild(commentMail);
        commentItem.appendChild(commentText);

        commentAuthor.innerText = comment.name;
        commentMail.innerText = comment.email;
        commentText.innerText = comment.body;

        commentsList.appendChild(commentItem);
      });
    });
}
/////////////

//Пагинация
const pages = document.querySelectorAll(".page");
const firstPage = document.querySelector(".first-page");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const lastPage = document.querySelector(".last-page");

pages.forEach((page) =>
  page.addEventListener("click", function () {
    const number = this.textContent;
    const nowUrl = newUrl + number;

    //Смена страниц
    const newNumbers = Number(number);
    changePages(newNumbers);

    deleteNews();
    requestNews(nowUrl);
    updateURL(number);
  })
);

firstPage.addEventListener("click", () => {
  deleteNews();
  updateURL(1);
  changePages(1);
  requestNews(url);
});

lastPage.addEventListener("click", () => {
  deleteNews();
  updateURL(numberLastPage);
  changePages(numberLastPage);
  requestNews(newUrl + numberLastPage);
});

//Функция смены страниц
function changePages(page) {
  const pageNumber = document.querySelector(".page-number");
  pageNumber.innerText = `Страница: ${page}`;

  if (page >= 3 && page <= numberLastPage) {
    one.innerText = page - 1;
    two.innerText = page;
    three.innerText = page + 1;
    three.style.display = "inline-block";
  }
  if (page === numberLastPage) {
    three.style.display = "none";
  } else if (page <= 2) {
    one.innerText = 1;
    two.innerText = 2;
    three.innerText = 3;
    three.style.display = "inline-block";
  }

  //Стрелочки Последняя и Первая стр.
  if (page >= 3) {
    firstPage.removeAttribute("disabled");
  }
  if (page >= numberLastPage) {
    lastPage.setAttribute("disabled", true);
  }
  if (page < numberLastPage) {
    lastPage.removeAttribute("disabled");
  }
  if (page <= 2) {
    firstPage.setAttribute("disabled", true);
  }
}
/////////////

//Добавляем номер страницы к URL
function updateURL(numberPage) {
  if (history.pushState) {
    var baseUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    var newUrl = baseUrl + `?page=${numberPage}`;
    history.pushState(null, null, newUrl);
  } else {
    console.warn("History API не поддерживается");
  }
}
/////////////

//Фунцкия создающая новость и добавляющая ее в HTML
function appendNews(id, name, description) {
  const li = document.createElement("li");
  li.classList.add("news-item");
  li.setAttribute("data-id", id);
  const title = document.createElement("h2");
  title.classList.add("item-title");
  const text = document.createElement("p");
  text.classList.add("item-body");

  title.innerText = name;
  text.innerText = description;

  li.appendChild(title);
  li.appendChild(text);

  ul.appendChild(li);
}
/////////////

//Удалить все новости
function deleteNews() {
  const oldLi = document.querySelectorAll("li");
  oldLi.forEach((li) => li.remove());
}
/////////////

//Получить NodeList всех ноовстей
function getNews() {
  const nodesNews = document.querySelectorAll("li");

  nodesNews.forEach((news) =>
    news.addEventListener("click", function () {
      const newsId = this.attributes[1].value;
      console.log(newsId);

      document.location.href = `./post.html?postid=${newsId}`;
    })
  );
}

const name = document.createElement("h1");
name.innerText = "Ruslan ";
