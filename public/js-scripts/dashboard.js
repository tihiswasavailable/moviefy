// Purpose: To fetch the movie data from the API and display it on the dashboard page
const API_KEY = 'ff68920a968c2d2dd9137d7879912b95';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

// Purpose: To fetch the genres from the API and display it on the dashboard page
const genres = [
    {
      "id":28,
      "name":"Action"
    },
    {
      "id":12,
      "name":"Adventure"
    },
    {
      "id":16,
      "name":"Animation"
    },
    {
      "id":35,
      "name":"Comedy"
    },
    {
      "id":80,
      "name":"Crime"
    },
    {
      "id":99,
      "name":"Documentary"
    },
    {
      "id":18,
      "name":"Drama"
    },
    {
      "id":10751,
      "name":"Family"
    },
    {
      "id":14,
      "name":"Fantasy"
    },
    {
      "id":36,
      "name":"History"
    },
    {
      "id":27,
      "name":"Horror"
    },
    {
      "id":10402,
      "name":"Music"
    },
    {
      "id":9648,
      "name":"Mystery"
    },
    {
      "id":10749,
      "name":"Romance"
    },
    {
      "id":878,
      "name":"Science Fiction"
    },
    {
      "id":10770,
      "name":"TV Movie"
    },
    {
      "id":53,
      "name":"Thriller"
    },
    {
      "id":10752,
      "name":"War"
    },
    {
      "id":37,
      "name":"Western"
    }
  ]

  

const main = document.getElementById('main');
const form = document.getElementById('dashboard-form');
const search = document.getElementById('search');

getMovies(API_URL);
// fetch(API_URL)
function getMovies(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = 
        `
        <img src="${IMG_URL+poster_path}" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
        `
        main.appendChild(movieElement); 
    })
}

function getColor(vote) {
    if(vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    } else {
        getMovies(API_URL);
    }
})