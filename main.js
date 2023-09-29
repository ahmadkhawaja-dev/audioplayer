var audioTrack = WaveSurfer.create({
  container: ".audio",
  waveColor: "#eee",
  progressColor: "red",
  barWidth: 2,
});

// Listen for the 'ready' event before attempting to play the audio
audioTrack.on('ready', function() {
  // Now it's safe to play the audio
  const playBtn = document.querySelector(".play-btn");
  
  playBtn.addEventListener("click", () => {
    audioTrack.playPause();

    if (audioTrack.isPlaying()) {
      playBtn.classList.add("playing");
    } else {
      playBtn.classList.remove("playing");
    }
  });
});

audioTrack.load("http://192.168.100.4:8080/audio/track1.mp3");

const playBtn = document.querySelector(".play-btn");
const stopBtn = document.querySelector(".stop-btn");
const muteBtn = document.querySelector(".mute-btn");
const volumeSlider = document.querySelector(".volume-slider");


stopBtn.addEventListener("click", () => {
  audioTrack.stop();
  playBtn.classList.remove("playing");
});

volumeSlider.addEventListener("mouseup", () => {
  changeVolume(volumeSlider.value);
});

const changeVolume = (volume) => {
  if (volume == 0) {
    muteBtn.classList.add("muted");
  } else {
    muteBtn.classList.remove("muted");
  }

  audioTrack.setVolume(volume);
};

muteBtn.addEventListener("click", () => {
  if (muteBtn.classList.contains("muted")) {
    muteBtn.classList.remove("muted");
    audioTrack.setVolume(0.5);
    volumeSlider.value = 0.5;
  } else {
    audioTrack.setVolume(0);
    muteBtn.classList.add("muted");
    volumeSlider.value = 0;
  }
});

const zoomInBtn = document.querySelector(".zoom-in-btn");

zoomInBtn.addEventListener("click", () => {
  audioTrack.zoom(audioTrack.params.pixelRatio * 5);
});

// Zoom Out 5x
const zoomOutBtn = document.querySelector(".zoom-out-btn");

zoomOutBtn.addEventListener("click", () => {
  audioTrack.zoom(audioTrack.params.pixelRatio / 5);
});

// Display Current Time on Click
const audioContainer = document.querySelector(".audio-container");

audioContainer.addEventListener("click", (event) => {
  const offsetX = event.clientX - audioContainer.getBoundingClientRect().left;
  const duration = audioTrack.getDuration();
  const currentTime = (offsetX / audioContainer.clientWidth) * duration;
  console.log(`Current Time: ${currentTime.toFixed(2)} seconds`);
});

