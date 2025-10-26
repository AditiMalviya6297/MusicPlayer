// Demo playlist
const playlist = [
    {
        title: "Song One",
        artist: "Artist A",
        src: "song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Artist B",
        src: "song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist C",
        src: "song3.mp3"
    }
];

let currentSong = 0;
let isAutoplay = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');
const autoplayEl = document.getElementById('autoplay');

function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    updatePlaylistUI();
}

function playSong() {
    audio.play();
}

function pauseSong() {
    audio.pause();
}

function nextSong() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playSong();
}

function prevSong() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    playSong();
}

function updateProgress() {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
    }
}

function setProgress(e) {
    const percent = e.target.value;
    audio.currentTime = (percent / 100) * audio.duration;
}

function setVolume(e) {
    audio.volume = e.target.value;
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updatePlaylistUI() {
    playlistEl.innerHTML = '';
    playlist.forEach((song, idx) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        if (idx === currentSong) li.classList.add('active');
        li.onclick = () => {
            currentSong = idx;
            loadSong(currentSong);
            playSong();
        };
        playlistEl.appendChild(li);
    });
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isAutoplay) nextSong();
});
progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
autoplayEl.addEventListener('change', (e) => {
    isAutoplay = e.target.checked;
});

// Initial load
loadSong(currentSong);
audio.volume = volume.value;
updatePlaylistUI();
