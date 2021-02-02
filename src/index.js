// import './style/index.scss';
// import style
const video = document.querySelector('video');
const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');

const volumeBar = document.querySelector('.volumeBar');
const videoMuteSoundBtn = document.querySelector('.videMute');
const videoNumber = document.querySelector('#vidNum');
const downloadVideoBtn = document.querySelector('.downloadVideo');
const timeCur = document.querySelector('.timeCur');
const timeVideo = document.querySelector('.timeVideo');

const videoSpeedBar = document.querySelector('.videoSpeed');
const speedBarIcon = document.querySelector('.fa-running');

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

function videoChangeVolume() {
  let volume = volumeBar.value / 100;
  video.valume = volume;

  if (volume == 0) {
    videoMuteSoundBtn.classList.remove('true');
    videoMuteSoundBtn.classList.add('false');
  } else {
    video.volume = 0;
    videoMuteSoundBtn.classList.remove('false');
    videoMuteSoundBtn.classList.add('true');
  }

  changeVolumeIcon(volume);
}

function videoDisableVolume() {
  let oldValSound;
  console.log(oldValSound);

  if (volumeBar.value == 0) {
    volumeBar.value = oldValSound;
  } else {
    oldValSound = volumeBar.value;
    volumeBar.value = 0;
  }

  videoChangeVolume();
}

function changeVolumeIcon(volume) {
  let volumeDown = document.querySelector('.fa-volume-down');
  let volumeUp = document.querySelector('.fa-volume-up');

  if (volume < 0.5) {
    volumeDown.classList.remove('hidden');
    volumeUp.classList.add('hidden');
  } else {
    volumeDown.classList.add('hidden');
    volumeUp.classList.remove('hidden');
  }
}

function videoChangeSpeed() {
  let speed = videoSpeedBar.value / 100;
  video.playbackRate = speed;
  console.log(video.playbackRate);
}

function changeVisability(item) {
  item.classList.toggle('hidden');
}

btnPlay.addEventListener('click', playOrPause);
btnPause.addEventListener('click', playOrPause);
video.addEventListener('click', playOrPause);
video.addEventListener('timeupdate', videoProgress);
progressBar.addEventListener('click', videoChangeTime);
volumeBar.addEventListener('change', videoChangeVolume);
speedBarIcon.addEventListener('click', () => changeVisability(videoSpeedBar));
videoSpeedBar.addEventListener('change', videoChangeSpeed);
videoMuteSoundBtn.addEventListener('click', videoDisableVolume);
