// import './style/index.scss';
// import style

const supportsVideo = !!document.createElement('video').canPlayType;
//if browser can play start

if (supportsVideo) {
  const body = document.querySelector('body');
  const volumeBar = document.querySelector('.volumeBar');
  const videoMuteSoundBtn = document.querySelector('.videoMute');
  const timeVideo = document.querySelector('.timeVideo');
  const timeCur = document.querySelector('.timeCur');
  const videoSpeedBar = document.querySelector('.videoSpeed');
  const speedBarBtn = document.querySelector('.speedBtn');
  const progressBar = document.querySelector('#videoProgress-bar');
  const setingsVideoBtn = document.querySelector('.setingsVideo');
  const setingsVideoBox = document.querySelector('.setingsVideo-box');
  const fullscreenBtn = document.querySelector('.btnFullscreen');
  const videoContainer = document.querySelector('.video-container');
  const video = document.querySelector('video');
  const videoControls = document.querySelector('.options');

  const btnPlay = document.querySelector('.btnPlay');
  const btnPause = document.querySelector('.btnPause');

  //buffering element
  const buffered = document.createElement('div');
  buffered.classList.add('buffered');
  videoControls.appendChild(buffered);

  //for doubleTap event
  let tapTwice = false;

  //hide defoult controls
  video.controls = false;

  // Fullscreen mode
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

    changeStyleInFullScreen();
  };

  const isFullScreen = function () {
    return !!document.fullscreenElement;
  };

  const setFullscreenData = function (state) {
    videoContainer.setAttribute('data-fullscreen', !!state);
  };

  function changeStyleInFullScreen() {
    if (isFullScreen()) {
      videoControls.classList.remove('hoverVideoControls');
      fullscreenBtn.classList.remove('hoverVideoControls');
    } else {
      videoControls.classList.add('hoverVideoControls');
      fullscreenBtn.classList.add('hoverVideoControls');
    }
  }

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

  // Find the position in progressBar
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

  function returnDefoultSpeedValue() {
    video.playbackRate = 1;
    videoSpeedBar.value = 100;
  }

  function changeVisability(item) {
    item.classList.toggle('hidden');
  }

  //Mute volume
  function muteVolume() {
    video.muted = !video.muted;
    volumeBar.value = 0;
    videoMuteSoundBtn.classList.add('false');

    if (!video.muted) {
      videoMuteSoundBtn.classList.remove('false');
      volumeBar.value = video.volume * 100;
    }
  }

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
  progressBar.addEventListener('mouseenter', (e) => {
    let pos = e.x;
    let mouseHoverTime = document.createElement('span');
    let lenghtToVideoContainer =
      (body.offsetWidth - videoContainer.offsetWidth) / 2;
    mouseHoverTime.classList.add('mouseHoverTime');
    let value = (e.pageX - findPos(progressBar)).toFixed(2);
    let timeToSet = (
      (video.duration / progressBar.offsetWidth).toFixed(2) * value
    ).toFixed(2);

    if (!document.querySelector('.mouseHoverTime')) {
      mouseHoverTime.style.left = pos - lenghtToVideoContainer + 'px';
      mouseHoverTime.innerText = `${videoTime(timeToSet)}`;
      videoContainer.append(mouseHoverTime);

      setTimeout(() => {
        let allMouseHoverTimes = document.querySelectorAll('.mouseHoverTime');
        allMouseHoverTimes.forEach((item) => item.remove());
      }, 500);
    }
  });

  volumeBar.addEventListener('change', changeVolume);
  setingsVideoBtn.addEventListener('click', () =>
    changeVisability(setingsVideoBox)
  );
  videoSpeedBar.addEventListener('change', videoChangeSpeed);
  speedBarBtn.addEventListener('click', returnDefoultSpeedValue);
  videoMuteSoundBtn.addEventListener('click', muteVolume);
  fullscreenBtn.addEventListener('click', handleFullscreen);
  video.addEventListener('dblclick', handleFullscreen);

  //jump 10sec video with arrowL & arrowR
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' && video.played) {
      video.currentTime += 10;
    } else if (event.key == 'ArrowLeft' && video.played) {
      video.currentTime -= 10;
    }
  });

  videoContainer.addEventListener(
    'touchstart',
    function (e) {
      let touch = e.changedTouches;

      if (!tapTwice) {
        tapTwice = true;
        setTimeout(() => {
          tapTwice = false;
        }, 300);
        return false;
      }
      e.preventDefault();

      //find dynamic pos video and take he width
      //if pos touch more then half video container jump to 10s video
      let halfVideoContainer = videoContainer.offsetWidth / 2;
      let lenghtToVideoContainer =
        (body.offsetWidth - videoContainer.offsetWidth) / 2;

      if (touch[0].pageX - lenghtToVideoContainer > halfVideoContainer) {
        video.currentTime += 10;
      } else if (touch[0].pageX - lenghtToVideoContainer < halfVideoContainer) {
        video.currentTime -= 10;
      }
    },
    { passive: true }
  );
  //Buffering visibility
  video.addEventListener('progress', function () {
    let bufferedProces =
      Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
    buffered.style.width =
      Math.floor(bufferedProces * videoContainer.offsetWidth) + 'px';
  });
}
