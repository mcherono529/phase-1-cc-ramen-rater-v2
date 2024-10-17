let URL = 'http://localhost:3000/ramens';

document.addEventListener("DOMContentLoaded", () => {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      data.forEach(ramen => {
        displayRamens(ramen);
      });
    })
    .catch(err => console.log('Error fetching ramens:', err));
});

function displayRamens(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');

  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.dataset.id = ramen.id;
  img.id = `ramen-${ramen.id}`;
  img.addEventListener('click', () => handleClick(ramen));
  
  ramenMenu.appendChild(img);
}
function addRamen(newRamen) {
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRamen),
  })
    .then(response => response.json())
    .then(data => {
      displayRamens(data);
    })
    .catch(err => console.log('Error adding new ramen:', err));
}
function deleteRamen(id) {
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })
  .then(() => {
    const ramenToDelete = document.querySelector(`#ramen-${id}`);
    if (ramenToDelete) {
      ramenToDelete.remove();
    }
  })
  .catch(err => console.log('Error deleting ramen:', err));
}

function handleClick(ramen) {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value,
    };

    addRamen(newRamen);

    form.reset(); 
  });
}

function main() {
  addSubmitListener();
}