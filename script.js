// Seleção de elementos
const modal = document.getElementById('modal');
const modalCloseBtn = modal.querySelector('.modal-close');
const videoFrame = document.getElementById('video');
const audioPlayer = document.getElementById('audio');
const stars = [...document.querySelectorAll('.stars button')];
const commentInput = document.getElementById('comment-input');
const submitCommentBtn = document.getElementById('submit-comment');
const commentsList = document.querySelector('.comments-list');
const modalTitle = document.getElementById('modalTitle');

let ratingValue = 0;
let comments = [];

// Função para abrir modal com vídeo e áudio
function openModal(movieCard) {
  const title = movieCard.querySelector('h2').textContent;
  const trailerURL = movieCard.dataset.trailer;
  const musicURL = movieCard.dataset.music;

  modalTitle.textContent = title;
  videoFrame.src = trailerURL + "?autoplay=1&rel=0";
  audioPlayer.src = musicURL;
  audioPlayer.play();

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  ratingValue = 0;
  clearStars();
  commentInput.value = '';
  renderComments();
  // foco para acessibilidade
  commentInput.focus();
}

// Fechar modal
modalCloseBtn.addEventListener('click', () => {
  closeModal();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  videoFrame.src = "";
  audioPlayer.pause();
  audioPlayer.src = "";
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

// Avaliação por estrelas

stars.forEach(star => {
  star.addEventListener('mouseenter', () => {
    highlightStars(star.dataset.value);
  });
  star.addEventListener('mouseleave', () => {
    clearStars();
  });
  star.addEventListener('click', () => {
    ratingValue = Number(star.dataset.value);
    setStars(ratingValue);
  });
});

function highlightStars(count) {
  stars.forEach(star => {
    star.style.color = star.dataset.value <= count ? '#ffbb00' : '#444';
  });
}

function clearStars() {
  stars.forEach(star => {
    star.style.color = star.dataset.value <= ratingValue ? '#ffbb00' : '#444';
  });
}

function setStars(count) {
  ratingValue = count;
  clearStars();
  stars.forEach(star => {
    star.setAttribute('aria-checked', star.dataset.value == count ? 'true' : 'false');
  });
}

// Comentários

submitCommentBtn.addEventListener('click', () => {
  const text = commentInput.value.trim();
  if (text === '') {
    alert('Por favor, escreva um comentário!');
    return;
  }
  comments.push({
    rating: ratingValue,
    text: text,
    time: new Date().toLocaleString()
  });
  renderComments();
  commentInput.value = '';
  ratingValue = 0;
  setStars(0);
});

function renderComments() {
  commentsList.innerHTML = '';
  comments.forEach(({rating, text, time}) => {
    const div = document.createElement('div');
    div.classList.add('comment');
    div.innerHTML = `
      <strong>${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</strong>
      <time>${time}</time>
      <p>${text}</p>
    `;
    commentsList.appendChild(div);
  });
}

// Eventos para abrir modal dos filmes

document.querySelectorAll('.movie-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card);
  });
});
