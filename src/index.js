// import style
// import './style/index.scss';

//hide the native control video
const video = document.querySelector('#video');
const videoControls = document.querySelector('#video-controls');
const playButton = document.getElementById('play');
const playbackIcons = document.querySelectorAll('playback-icons use');

const videWorks = !!document.createElement('video').canPlayType;
if (videWorks) {
  video.controls = false;
  videoControls.classList.remove('hidden');
}

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
    // playButton.style.opacity = 0;
  } else {
    video.pause();
    // playButton.style.opacity = 1;
  }
}

function updatePlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));
}

if (video.paused) {
  playButton.setAttribute('data-title', 'Play (k)');
} else {
  playButton.setAttribute('data-title', 'Pause (k)');
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
