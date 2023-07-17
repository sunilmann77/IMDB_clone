
const movieContainer = document.querySelector("#moviefetch1");

//Get data from localstorage
let favMovies = JSON.parse(localStorage.getItem("favMovies"));

//Get all Favourite movies
favMovies.forEach((id) => {
          getData(id); // Get Movie from API with ID
});


async function getData(movieID) {
          console.log(movieID);
          const result = await fetch(
                    `http://www.omdbapi.com/?i=${movieID}&apikey=755f786c`
          ); //Get data from API using IMDB id
          const movieDetails = await result.json(); //Make data readable

          AddMovie(movieDetails); //Add to DOM
}

//Add movie to DOM
const AddMovie = (details) => {
          const child = document.createElement("div"); //Create movie box

          child.setAttribute("id", details.imdbID); //Set unique id to delete exact movie
          child.setAttribute("class", "result-grid"); //Add CSS

          child.innerHTML = `
          <div class="movie-poster-f">
        <img src="${
                  details.Poster != "N/A" ? details.Poster : "../notFound.png"
        }" alt="movie-poster">
        </div>

        <div class="movie-info-f">
            <h3 class="movie-title1">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="released">Released date.: ${details.Released}</li>
            </ul>

            <p class="genre-f"><b>Genre: </b>${details.Genre}</p>
            <p class="writer-f"><b>Writer: </b> ${details.Writer}</p>
            <p class="actors-f"><b>Actors: </b> ${details.Actors}</p>
            <p class="plot-f"><b>Plot: </b> ${details.Plot}</p>
            <p class="language-f"><b>Language: </b> ${details.Language}</p>
            <p class="awards-f"><b>Awards: ${details.Awards}</p>
        </div> `;

// favorite button
         const btn = document.createElement("button");
         btn.setAttribute("class", "delete-btn"); // Add CSS
         btn.innerHTML = `<i data-id="${details.imdbID}" class="fa-solid fa-trash">`; //Set unique id to delete exact movie

         btn.addEventListener("click", deleteMovie); // Add event listener to each button
         child.appendChild(btn); //Add button to Movie

         movieContainer.appendChild(child); //Add movie to DOM
};

const deleteMovie = (e) => {
          const delID = e.target.dataset.id;
          const movie = document.getElementById(`${delID}`);
          movie.remove();
          favMovies = favMovies.filter((id) => id != delID);

          //Adding data from list to localstorage
          localStorage.setItem("favMovies", JSON.stringify(favMovies));
};
