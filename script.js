let movieInput = document.querySelector(`.form__input`);
const moviesList = document.querySelector(`.layout__movies-list`);
const form = document.querySelector(`.movies-form__form`);

let arrMovies = JSON.parse(localStorage.getItem("movies")) || [];
console.log(`movies loaded from local storage`);

const renderMovies = function (movies) {
  moviesList.innerHTML = ``;
  movies.forEach((movie, index) => {
    const movieHTML = `
  <div class="movies-list__element">
           <div>
           <p class="close-btn" data-index="${index}">✖</p>
           </div>
           <div class="element__container">
           <p class="element__title">"${movie}"</p>
           <button class="element__edit" data-index="${index}" type="button">Edit</button>
              </div>
         </div>
       `;

    moviesList.insertAdjacentHTML(`beforeend`, movieHTML);
    console.log(`movie rendered`);
  });

  const editBtns = moviesList.querySelectorAll(`.element__edit`);

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener(`click`, function () {
      const index = this.dataset.index;
      const editedMovie = prompt(`Edit movie:`, arrMovies[index]);

      if (editedMovie !== `` && editedMovie !== null) {
        arrMovies[index] = editedMovie;
        updateLocalStorage(arrMovies);

        renderMovies(arrMovies);
        console.log(`movie edited`);
      }
    });
  });

  const closeBtns = moviesList.querySelectorAll(`.close-btn`);
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener(`click`, function () {
      const index = this.dataset.index;
      arrMovies.splice(index, 1);
      updateLocalStorage(arrMovies);

      renderMovies(arrMovies);
      console.log(`Movie removed`);
    });
  });
};

const updateLocalStorage = function (movies) {
  localStorage.setItem("movies", JSON.stringify(movies));
  console.log(`Movie saved to local`);
};

form.addEventListener(`submit`, function (e) {
  e.preventDefault();
  const movie = movieInput.value;

  if (movie !== ``) {
    arrMovies.push(movie);
    updateLocalStorage(arrMovies);
    renderMovies(arrMovies);
    movieInput.value = ``;
    console.log(`Movie Added`);
  }
});

renderMovies(arrMovies);
