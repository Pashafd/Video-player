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
const timeCur = document.querySelector('.timeCur');
const timeVideo = document.querySelector('.timeVideo');

const progressBar = document.querySelector('progress');

function playOrPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  changePlayAndPauseButtons();

  if (timeVideo.innerHTML == '00:00') {
    timeVideo.innerHTML = videoTime(video.duration);
  }
}

function changePlayAndPauseButtons() {
  btnPlay.classList.toggle('hidden');
  btnPause.classList.toggle('hidden');
}

function videoTime(time) {
  time = Math.floor(time);
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  let minutesVal = minutes;
  let secondsVal = seconds;

  if (minutes < 10) {
    minutesVal = '0' + minutes;
  }

  if (seconds < 10) {
    secondsVal = '0' + seconds;
  }

  return minutesVal + ':' + secondsVal;
}

function videoProgress() {
  progress = Math.floor(video.currentTime) / (Math.floor(video.duration) / 100);

  progressBar.value = progress;
  timeCur.innerHTML = videoTime(video.currentTime);
}

function videoChangeTime(e) {
  let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
  let progress = mouseX / (progressBar.offsetWidth / 100);
  video.currentTime = video.duration * (progress / 100);
}

btnPlay.addEventListener('click', playOrPause);
btnPause.addEventListener('click', playOrPause);
video.addEventListener('click', playOrPause);
video.addEventListener('timeupdate', videoProgress);
progressBar.addEventListener('click', videoChangeTime);
