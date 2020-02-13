const container = document.querySelector(".container");
let seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const moviesSelect = document.getElementById("movie");
const screen = document.querySelector(".screen");
let ticketPrice = +moviesSelect.value;
const numOfRows = 8;
const numOfColumns = 8;
let submitBtn, clearBtn;

populateUI();

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// update total and count
function updatedSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  // copy selected seats into arr
  // map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// movie select event
moviesSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updatedSelectedCount();
});

// get data from localstorage and populate UI
function populateUI() {
  // create row and columns
  for (let i = 0; i <= numOfRows; i++) {
    // create row element
    let row = document.createElement("div");
    row.className = "row";

    // add columns
    for (let j = 0; j <= numOfColumns; j++) {
      // create column element
      let column = document.createElement("div");
      let random = getRandomInt(5);
      column.className = "seat";
      if (j == 1) {
        column.classList.add("occupied");
      }
      if (j == 3) {
        column.classList.add("occupied");
      }

      // append the column to the row
      row.appendChild(column);
      //   append row to container
      container.appendChild(row);
    }
  }
  seats = document.querySelectorAll(".row .seat:not(.occupied)");
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    moviesSelect.selectedIndex = selectedMovieIndex;
  }
}

// seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updatedSelectedCount();
  }
});

updatedSelectedCount();

function submitSelectedSeats() {}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
