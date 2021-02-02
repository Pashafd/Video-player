// import './style/index.scss';
// import style
const video = document.querySelector('video');
const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');
const btnPrev = document.querySelector('#btnPrev');
const btnStop = document.querySelector('#btnStop');
const btnNext = document.querySelector('#btnNext');

const soundBar = document.querySelector('#soundBar');
const videoNumber = document.querySelector('#vidNum');
const downloadVideoBtn = document.querySelector('.downloadVideo');
const videoSpeedBtn = document.querySelector('#videoSpeed');

const progressBar = document.querySelector('progress');

console.log(btnPause);

function playOrPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  changePlayAndPauseButtons();
}

function changePlayAndPauseButtons() {
  btnPlay.classList.toggle('hidden');
  btnPause.classList.toggle('hidden');
}

btnPlay.addEventListener('click', playOrPause);
btnPause.addEventListener('click', playOrPause);
