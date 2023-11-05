let movie;
let page;
const input = document.querySelector('#movie-search');

function OnChangeSearch(searchParam){
  axios.get(`http://www.omdbapi.com/?apikey=d684a20e&s=${searchParam}&page=1`)
  .then(function (response) {
    const movies = response.data.Search
    let dataGenre
    let cards = ''
    const main = document.querySelector('#group-card')
    movies.forEach(data => {
      axios.get(`http://www.omdbapi.com/?apikey=d684a20e&i=${data.imdbID}&page=1`)
        .then(function (genre) {
          dataGenre = genre.data
          // console.log(dataGenre.Genre) 
          cards += showCards(data, dataGenre)
          main.innerHTML = cards
        })
      })
    })
  }
  
  function showCards(data, dataGenre) {
    return `
    <div class="movie-card" id="movie-card">
      <img src="${data.Poster}" title="${data.Title}">
      <h1>${data.Title}</h1>
      <p><b>Genre: </b>${dataGenre.Genre}</p> 
      <div class="movie-other">
        <p>${data.Year}</p>
        <p class="movie-type">${data.Type}</p>
      </div>
    </div>
    `
}

// function showGenre(genrenya) {
//   console.log(genrenya.Genre);
//   return `
//     <p>${genrenya.Genre}</p>
//   `
// }

input.addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    OnChangeSearch(input.value)
  }
})

const search = document.querySelector('#search')
search.addEventListener('click', function(){
    OnChangeSearch(input.value)
})
