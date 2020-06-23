const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

// save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update selected count

function updateSelectedCount() {
  let selectedSeats = document.querySelectorAll('.row .selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  let selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  let totalPrice = selectedSeatsCount * ticketPrice;
  total.innerText = totalPrice;
}

// Getdata from localstogate and populate UI
function populateUI() {
  const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeat !== null && selectedSeat.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeat.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// change optine event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// click
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();
