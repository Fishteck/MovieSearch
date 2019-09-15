"use strict";

const searchForm = document.querySelector('#search-form'),
      movies     = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=8486e323ff1d52005b54543dda2d8ec4&language=ru&query=' + searchText;
    requestApi(server);

}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {

    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.addEventListener('readystatechange', () => {

        if (request.readyState !== 4) {
            movies.innerHTML = 'Загрузка';
            return;
        }

        if (request.status !== 200) {
            movies.innerHTML = 'Упс...Что-то пошло не так :(';
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function (item) {
            let nameItem = item.name || item.title;
            inner += `<div class = "col-12 col-md-4 col-xl-3">${nameItem}</div>`;
        });

        movies.innerHTML = inner;

        console.log(request.readyState);
    });
}