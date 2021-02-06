// import './style/index.scss';
// import style

const volumeBar = document.querySelector('.volumeBar');
const videoMuteSoundBtn = document.querySelector('.videMute');
const timeVideo = document.querySelector('.timeVideo');
const timeCur = document.querySelector('.timeCur');
const videoSpeedBar = document.querySelector('.videoSpeed');
const speedBarIcon = document.querySelector('.fa-running');
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

  function videoChangeTime(e) {
    let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
    let progress = mouseX / (progressBar.offsetWidth / 100);
    video.currentTime = video.duration * (progress / 100);

    console.log(progress);
  }

  function changeVolume() {
    let volume = volumeBar.value / 100;
    video.valume = volume;

    if (volume == 0) {
      videoMuteSoundBtn.classList.toggle('false');
    } else {
      video.volume = 0;
      videoMuteSoundBtn.classList.toggle('false');
    }

    changeVolumeIcon(volume);
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
  }

  function changeVisability(item) {
    item.classList.toggle('hidden');
  }

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
      video.width = '100%';
    }
  };

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

  progressBar.addEventListener('click', videoChangeTime);

  volumeBar.addEventListener('change', changeVolume);

  setingsVideoBtn.addEventListener('click', () =>
    changeVisability(setingsVideoBox)
  );

  videoSpeedBar.addEventListener('change', videoChangeSpeed);

  videoMuteSoundBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    volumeBar.value = 0;
  });

  fullscreenBtn.addEventListener('click', handleFullscreen);
}
