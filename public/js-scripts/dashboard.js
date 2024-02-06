// Purpose: To fetch the movie data from the API and display it on the dashboard page
const API_KEY = 'ff68920a968c2d2dd9137d7879912b95';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
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
  
// getElements from the dashboard.ejs file
const main = document.getElementById('main');
const form = document.getElementById('dashboard-form');
const search = document.getElementById('search');
const tagsElement = document.getElementById('tags');

// execute the getMovies function to fetch the movie data from the API
getMovies(API_URL);

// execute the showGenres function to display the genres on the dashboard page
showGenres();

// function to fetch the movie data from the API
function getMovies(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        //console.log(data.results)
        if(data.results.length !== 0){
          showMovies(data.results);
        } else {
          main.innerHTML = `<h1 class="no-results"> No Results Found</h1>`
      }
    })
}

// function to display the movie data on the dashboard page
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        //console.log(vote_average, getColor(vote_average));
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

// function to get the color of the vote average
function getColor(vote) {
    if(vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// function for the search bar
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    } else {
        getMovies(API_URL);
    }
})

// function to display the genres on the dashboard page
var selectedGenre = [];
function showGenres() {
  tagsElement.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if(selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if(selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if(id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          })
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL+'&with_genres='+encodeURI(selectedGenre.join(',')))
      highlightSelection();   
  })
  tagsElement.append(t);
})
}

// function to highlight the selected genre
function highlightSelection() {
  console.log('highlightSelection function called');
  const allTags = document.querySelectorAll('.tag');
  console.log('allTags:', allTags);
  allTags.forEach(tag => {
    tag.classList.remove('highlight');
  })
  deleteSelection();
  if(selectedGenre.length!=0) {
    console.log('selectedGenre:', selectedGenre);
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlight');
    })
  }
}

// function to delete the selected genre
function deleteSelection() {
let clearBtn = document.getElementById('clear');
if(clearBtn) {
  clearBtn.classList.add('highlight');
} else {
  let clear = document.createElement('div');
  console.log('created clear:', clear);
  clear.classList.add('tag', 'highlight');
  clear.id = 'clear';
  clear.innerText = 'Clear x';
  clear.addEventListener('click', () => {
    selectedGenre = [];
    showGenres();
    getMovies(API_URL);
  })
  tagsElement.appendChild(clear);
}
}
