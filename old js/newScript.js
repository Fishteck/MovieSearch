"use strict";

const searchForm = document.querySelector('#search-form'),
    movies = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=8486e323ff1d52005b54543dda2d8ec4&language=ru&query=' + searchText;
    movies.innerHTML = 'Загрузка...';
    requestApi(server)
        .then(function (result) {
            const output = JSON.parse(result);
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                inner += `<div class = "col-12 col-md-4 col-xl-3">${nameItem}</div>`;
            });

            movies.innerHTML = inner;
        })
        .catch(function (reason) {
           movies.innerHTML = 'Упс...Что-то пошло не так :(';
           console.log('error: ' + reason.status);
        });

}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {                                 //Используется для отправки данных
    return new Promise(function (resolve, reject) {

        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('load', function () {
            if (request.status !== 200) {
                reject({
                    status: request.status
                });
                return;
            }

            resolve(request.response);
        });

        request.addEventListener('error', function () {
            reject({
                status: request.status
            });
        });

        request.send();
    });

}


// request.addEventListener('readystatechange', () => {
//     if (request.readyState !== 4) {
//         return;
//     }
//     if (request.status !== 200) {
//         return;
//     }
//     console.log(request.readyState);
// });