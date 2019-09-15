"use strict";

const searchForm = document.querySelector('#search-form'),
      movies     = document.querySelector('#movies'),
      urlPoster  = 'https://image.tmdb.org/t/p/w500';


function apiSearch(event) {                     //Используется для отправки данных
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if(searchText.trim().length === 0) {
        movies.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
        return;
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=8486e323ff1d52005b54543dda2d8ec4&language=ru&query=' + searchText;

    movies.innerHTML = '<div class="spinner"></div>';   //Добавление спинера загрузки
}

searchForm.addEventListener('submit', apiSearch);       //Вызывает функцию apiSearch при поиске фильма

function addEventMedia() {                              //Событие при нажатии на картинку
    const media = movies.querySelectorAll('img[data-id]');
    media.forEach(function(elem) {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });
}

function showFullInfo() {
let url = '';
    if(this.dataset.type === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id +'?api_key=8486e323ff1d52005b54543dda2d8ec4&language=ru';
    } else if (this.dataset.type === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id +'?api_key=8486e323ff1d52005b54543dda2d8ec4&language=ru';
    } else {
        movies.innerHTML = '<h2 class="col-12 text-center text-danger">Произошла ошибка! Повторите позже</h2>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=8486e323ff1d52005b54543dda2d8ec4&language=ru')           //Принятие и обработка промиса
    .then(function(value) {
        if(value.status !== 200) {
            return Promise.reject(new Error('Ошибка'));
        }
        return value.json();
    })
    .then(function(output) {
       let inner = '<h4 class="col-12 text-center text-info">Популярное за неделю</h4>';
       if(output.results.length === 0) {
           inner = '<h2 class="col-12 text-center text-info">По вашему запросу не было ничего найдено :(</h2>';
       }
       output.results.forEach(function (item) {
           let nameItem = item.name || item.title;
           let mediaType = item.title ? 'movie' : 'tv';
           const poster = item.poster_path ? urlPoster + item.poster_path : './img/1.jpg';
           let dataInfo = `data-id="${item.id}" 
           data-type="${mediaType}"`;
           inner += `
           <div class = "col-12 col-md-4 col-xl-3">
           <img src="${poster}" class="poster" alt = "${nameItem}" ${dataInfo}>
           ${nameItem}
           </div>
           `;
       });

       movies.innerHTML = inner;
       
       addEventMedia();
       
    })
    .catch(function(reason) {                  //Обработка ошибок
          movies.innerHTML = 'Упс...Что-то пошло не так :(';
          console.log('error: ' + reason);
    });
});






