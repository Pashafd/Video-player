// import './style/index.scss';
// import style

const volumeBar = document.querySelector('.volumeBar');
const videoMuteSoundBtn = document.querySelector('.videoMute');
const timeVideo = document.querySelector('.timeVideo');
const timeCur = document.querySelector('.timeCur');
const videoSpeedBar = document.querySelector('.videoSpeed');
const speedBarBtn = document.querySelector('.speedBtn');
const progressBar = document.querySelector('#videoProgress-bar');
const setingsVideoBtn = document.querySelector('#setingsVideo');
const setingsVideoBox = document.querySelector('.setingsVideo-box');
const fullscreenBtn = document.querySelector('.btnFullscreen');
const supportsVideo = !!document.createElement('video').canPlayType;

if (supportsVideo) {
  const videoContainer = document.querySelector('.container');
  const video = document.querySelector('video');
  const videoControls = document.querySelector('.options');

  const btnPlay = document.querySelector('.btnPlay');
  const btnPause = document.querySelector('.btnPause');

  //hide defoult controls
  video.controls = false;
  //display cust controls
  videoControls.style.display = 'grid';

  //Fullscreen mode
  const fullScreenEnabled = !!(
    document.fullscreenEnabled ||
    document.createElement('video').webkitRequestFullScreen
  );

  if (!fullScreenEnabled) {
    fullscreen.style.display = 'none';
  }

  const handleFullscreen = function () {
    if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      setFullscreenData(false);
    } else {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      setFullscreenData(true);
    }
  };

  function playOrPause() {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
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
    let progress =
      Math.floor(video.currentTime) / (Math.floor(video.duration) / 100);
    progressBar.value = progress;
    timeCur.innerHTML = videoTime(video.currentTime);
  }

  // Set the play position of the video based on the mouse click at x
  function setPlayPosition(e) {
    let value = (e.pageX - findPos(progressBar)).toFixed(2);
    let timeToSet = (
      (video.duration / progressBar.offsetWidth).toFixed(2) * value
    ).toFixed(2);
    video.currentTime = timeToSet;
  }

  // Find the real position of obj
  function findPos(obj) {
    let curleft = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
      } while ((obj = obj.offsetParent));
    }
    return curleft;
  }

  function changeVolume() {
    let volume = volumeBar.value / 100;
    video.volume = volume;
  }

  function videoChangeSpeed() {
    let speed = videoSpeedBar.value / 100;
    video.playbackRate = speed;
  }

  function changeVisability(item) {
    item.classList.toggle('hidden');
  }

  const isFullScreen = function () {
    return !!document.fullscreenElement;
  };

  const setFullscreenData = function (state) {
    videoContainer.setAttribute('data-fullscreen', !!state);
  };

  //LISTENER
  btnPlay.addEventListener('click', () => {
    playOrPause();
    changePlayAndPauseButtons();

    if (timeVideo.innerHTML == '00:00') {
      timeVideo.innerHTML = videoTime(video.duration);
    }
  });

  btnPause.addEventListener('click', () => {
    playOrPause();
    changePlayAndPauseButtons();

    if (timeVideo.innerHTML == '00:00') {
      timeVideo.innerHTML = videoTime(video.duration);
    }
  });

  video.addEventListener('click', () => {
    playOrPause();
    changePlayAndPauseButtons();

    if (timeVideo.innerHTML == '00:00') {
      timeVideo.innerHTML = videoTime(video.duration);
    }
  });

  video.addEventListener('timeupdate', videoProgress);

  progressBar.addEventListener('click', setPlayPosition);

  volumeBar.addEventListener('change', changeVolume);

  setingsVideoBtn.addEventListener('click', () =>
    changeVisability(setingsVideoBox)
  );

  videoSpeedBar.addEventListener('change', videoChangeSpeed);
  speedBarBtn.addEventListener('click', () => {
    video.playbackRate = 1;
    videoSpeedBar.value = 100;
  });

  videoMuteSoundBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    volumeBar.value = 0;
    videoMuteSoundBtn.classList.add('false');

    if (!video.muted) {
      videoMuteSoundBtn.classList.remove('false');
      volumeBar.value = video.volume * 100;
      console.dir(video);
    }
  });

  fullscreenBtn.addEventListener('click', handleFullscreen);
  video.addEventListener('dblclick', handleFullscreen);
}
