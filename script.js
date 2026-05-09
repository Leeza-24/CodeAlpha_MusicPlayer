const songs = [

  {
    name:"Perfect",
    artist:"Ed Sheeran",
    path:"songs/song1.mp3",
    cover:"images/music1.jpg"
  },

  {
    name:"Dreams",
    artist:"Imagine",
    path:"songs/song2.mp3",
    cover:"images/music2.jpg"
  },

  {
    name:"Night Sky",
    artist:"Alan",
    path:"songs/song3.mp3",
    cover:"images/music3.jpg"
  },

  {
    name:"Relax Beat",
    artist:"DJ Relax",
    path:"songs/song4.mp3",
    cover:"images/music4.jpg"
  },

  {
    name:"Summer",
    artist:"Maroon",
    path:"songs/song5.mp3",
    cover:"images/music5.jpg"
  }

];

const songsContainer =
document.getElementById(
  "songs-container"
);

const audio =
document.getElementById("audio");

const playBtn =
document.getElementById("play-btn");

const progress =
document.getElementById("progress");

const title =
document.getElementById("title");

const cover =
document.getElementById("cover");

const search =
document.getElementById("search");

let songIndex = 0;

let isPlaying = false;

/* Create Song Cards */

function displaySongs(data){

  songsContainer.innerHTML = "";

  data.forEach((song,index)=>{

    const card =
    document.createElement("div");

    card.classList.add("song-card");

    card.innerHTML = `

      <img src="${song.cover}">

      <h3>${song.name}</h3>

      <p>${song.artist}</p>

      <button onclick="playSong(${index})">

        Play

      </button>
    `;

    songsContainer.appendChild(card);

  });

}

displaySongs(songs);

/* Play Selected Song */

function playSong(index){

  songIndex = index;

  loadSong();

  audio.play();

  playBtn.innerText = "⏸";

  isPlaying = true;
}

/* Load Song */

function loadSong(){

  audio.src =
  songs[songIndex].path;

  title.innerText =
  songs[songIndex].name;

  cover.src =
  songs[songIndex].cover;
}

loadSong();

/* Play Pause */

function playPause(){

  if(isPlaying){

    audio.pause();

    playBtn.innerText = "▶";
  }

  else{

    audio.play();

    playBtn.innerText = "⏸";
  }

  isPlaying = !isPlaying;
}

/* Next Song */

function nextSong(){

  songIndex =
  (songIndex + 1)
  % songs.length;

  loadSong();

  audio.play();

  playBtn.innerText = "⏸";

  isPlaying = true;
}

/* Previous Song */

function prevSong(){

  songIndex =
  (songIndex - 1 + songs.length)
  % songs.length;

  loadSong();

  audio.play();

  playBtn.innerText = "⏸";

  isPlaying = true;
}

/* Progress */

audio.addEventListener(
"timeupdate",()=>{

  progress.value =
  (audio.currentTime
  / audio.duration)
  * 100;
});

/* Seek */

progress.addEventListener(
"input",()=>{

  audio.currentTime =
  (progress.value / 100)
  * audio.duration;
});

/* Auto Next */

audio.addEventListener(
"ended",()=>{

  nextSong();
});

/* Search Songs */

search.addEventListener(
"keyup",()=>{

  const value =
  search.value.toLowerCase();

  const filtered =
  songs.filter(song =>

    song.name
    .toLowerCase()
    .includes(value)

  );

  displaySongs(filtered);

});