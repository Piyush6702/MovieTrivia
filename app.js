//get all Api like -: movie_api (to get popular movies),Image_api(to get image of image),Search_api(to get searched movie)

const newLocal =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=31d4159a77ed64804e2d38c12cb98cbf&page=1";
let movie_api = newLocal;
let Image_api = "https://image.tmdb.org/t/p/w500";
let Search_api =
  'https://api.themoviedb.org/3/search/movie?api_key=31d4159a77ed64804e2d38c12cb98cbf&query="';

//get main ,form , query(for searching)
let main = document.querySelector(".main");
let form = document.getElementById("searchform");
let query = document.querySelector(".query");

// add evenlistner to form, 'submit' so when you hit enter , it will reflect the result
form.addEventListener("submit", (e) => {
  // prevent default helps to keep us on same page
  e.preventDefault();

  //get value inside search_box
  let search = query.value;

  if (search && search != "") {

    // add query with search_api
    getmovies(Search_api + search);
  } else {
    getmovies(movie_api);
  }
});

//get movies using api_url
getmovies(movie_api);

// Promises used to get result using api's
async function getmovies(url) {
  let res = await fetch(url);
  let data = await res.json();

  showdata(data.results);
}

// main function to insert movies in DOM
function showdata(movies) {
  // intialise main section with empty html
  main.innerHTML = "";

  // iterate through each movie and get the details
  movies.forEach((movie) => {
      
    // New method instead of using movie.title , we fetched the details like this
    let { title, poster_path, vote_average, overview } = movie;

    // creating new div for a movie
    let movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    // adding complete Html through js
    movieEl.innerHTML = `
        <img src="${Image_api + poster_path}" alt="${title}">
        <div class="movie-info">
            <p class="title">${title}</p>
            <p class="rating ${get_ratingclass(
              vote_average
            )}">${vote_average}</p>
        </div>
        <div class="overview">
            <h2>Overview</h2>
            <hr class="ruler">
            ${overview}
        </div>`;

    main.append(movieEl);
  });
}

// this function helps us to get class of voting_average so that we can change the colour of rating box
function get_ratingclass(average) {
  if (average > 8) {
    return "orange";
  } else if (average > 5.0) {
    return "green";
  } else {
    return "red";
  }
}
