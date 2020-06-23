const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// update selected count

function updateSelectedCount() {
  let selectedSeats = document.querySelectorAll('.row .selected');
  let selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  let totalPrice = selectedSeatsCount * ticketPrice;
  total.innerText = totalPrice;
}

// change optine event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
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
