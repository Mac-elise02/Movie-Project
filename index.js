function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

async function fetchMovies(potter) {
  const API_KEY = "50afa4e2";
  const searchQuery = "potter"; 

  const response = await fetch(`https://www.omdbapi.com/?i=${tt3896198}&apikey=50afa4e2&s=${potter}`); 

  const data = await response.json(); 

  if (!data.Search) return[]; 

  return data.Search.map(movie => ({
    title: movie.title, 
    year: movie.Year, 
    imdbID: movie.imdbID, 
    url: movie.Poster, 
    rating: Math.random() * 5 })); 
  } 


let movies = null; 
let currentSearch = "potter"; 

async function renderMovies(filter) {
  const MovieWrapper = document.querySelector(".Movies"); 

  if(!movies) {
    movies = await fetchMovies(currentSearch); 
  }

  moviesWrapper.classList.remove('movies__loading'); 

  if(filter === "OLD_TO_NEW") {
    movies.sort((a, b) => Number(a.year) - Number(b.year)); 
  } else if (filter === "NEW_TO_OLD") {
    movies.sort((a, b) => Number(b.year) - Number(a.year)); 
  } else if (filter === "RATING") {
    movies.sort((a, b) => b.rating - a.rating); 
  }

const moviesHtml = movies .map(movie => 
  `<div class="movie">
     <figure class="movie__img--wrapper">
       <div class="movie__img" src="${movie.url}"></div>
     </figure>
     <div class="movie__title">
       ${movie.title}
     </div>
     <div class="movie__rating">
       ${ratingsHTML(movie.rating)}
     </div>
   <div>`
)
.join(""); 

  moviesWrapper.innerHTML = moviesHtml; 
}

function ratingsHTML(rating) {
  let ratingHTML = ""; 
  for(let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fa-solid fa-star"></i>\n'; 
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fa-solid fa-star-half-alt"></i>\n'; 
  }
  return ratingHTML; 
}

function filterMovies(event) {
  renderMovies(event.target.value); 
}

let searchTimeout; 

function handleSearch(value) {
  clearTimeout(searchTimeout); 

  searchTimeout = setTimeout(async () => {
    currentSearch = value.trim() || "potter"; 

    movie = await fetchMovies(currentSearch); 
    renderMovies(); 
  }, 400); 
}

// DATA API
function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
            Title: "Harry Potter and the Sorcerer's Stone",
            Year: "2001", 
            imbdID: "tt0241527", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_SX300.jpg", 
        },
        {
            Title: "Harry Potter and the Chamber of Secrets", 
            Year: "2002", 
            imbdID: "tt0295297", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BNGJhM2M2MWYtZjIzMC00MDZmLThkY2EtOWViMDhhYjRhMzk4XkEyXkFqcGc@._V1_SX300.jpg", 
        }, 
        {
            Ttitle: "Harry Potter and the Prisoner of Azkaban", 
            Year: "2004", 
            imbdID: "tt0304141", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg", 
        }, 
        {
            Title: "Harry Potter and the Goblet of Fire", 
            Year: "2005", 
            imbdID: "tt0330373", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg", 
        }, 
        {
            Title: "Harry Potter and the Order of the Phoenix", 
            Year: "2007", 
            imbdID: "tt0373889", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_SX300.jpg", 
        }, 
        {
            Title: "Harry Potter and the Half-Blood Prince", 
            Year: "2009", 
            imbdID: "tt0417741", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg",
        }, 
        {
            Title: "Harry Potter and the Deathly Hallows(part 1)", 
            Year: "2010", 
            imbdID: "tt0926084", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX300.jpg", 
        }, 
        {
            Title: "Harry Potter and the Deathly Hallows(part 2)", 
            Year: "2011", 
            imbdID: "tt1201607", 
            Type: "movie", 
            Poster: "https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg", 
        }
      ]);
    }, 1000);
  });
}