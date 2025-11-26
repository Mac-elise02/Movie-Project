function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

async function fetchMovies(search = "potter") {
  const API_KEY = "50afa4e2";

  const response = await fetch(`https://www.omdbapi.com/?apikey=${50afa4e2}&s=${potter}`); 

  const data = await response.json(); 

  if (!data.Search) return[]; 

  return data.Search.map(movie => ({
    Title: movie.Title, 
    year: movie.Year, 
    imdbID: movie.imdbID, 
    url: movie.Poster, 
    rating: Math.random() * 5 })); 
  } 


let movies = null; 
let currentSearch = "potter"; 

async function renderMovies(filter) {
  const moviesWrapper = document.querySelector(".movies"); 

  if(!movies) {
    movies = await fetchMovies(currentSearch); 
  }

  if(filter === "OLD_TO_NEW") {
    movies.sort((a, b) => Number(a.year) - Number(b.year)); 
  } else if (filter === "NEW_TO_OLD") {
    movies.sort((a, b) => Number(b.year) - Number(a.year)); 
  } else if (filter === "RATING") {
    movies.sort((a, b) => b.rating - a.rating); 
  }

const moviesHtml = movies 
.map(
  (movie) => 
  `<div class="movie">
     <figure class="movie__img--wrapper">
       <img class="movie__img" src="${movie.url}" />
     </figure>
     <div class="movie__title">${movie.Title}</div>
     <div class="movie__rating">${ratingsHTML(movie.rating)}</div>
   </div>`
)
.join(""); 

  moviesWrapper.innerHTML = moviesHtml; 
}

function ratingsHTML(rating) {
  let  ratingHTML= ""; 
  for(let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fa-solid fa-star"></i>'; 
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fa-solid fa-star-half-alt"></i>'; 
  }
  return ratingHTML; 
}

let searchTimeout; 

function handleSearch(value) {
  clearTimeout(searchTimeout); 

  searchTimeout = setTimeout(async () => {
    currentSearch = value.trim() || "potter"; 

    movies = await fetchMovies(currentSearch); 
    renderMovies(); 
  }, 400); 
}
