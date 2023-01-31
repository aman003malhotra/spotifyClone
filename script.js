console.log("Welcome to spotify");

let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let currentSong = document.getElementById("currentSong");
let songs = [
    {
        songName: "Despacito",
        filePath: "./songs/1.mp3",
        coverPath:"./covers/1.jpg"
    },
    {
        songName: "Candle in the Wind",
        filePath: "./songs/2.mp3",
        coverPath:"./covers/2.jpg"
    },
    {
        songName: "In the Summertime",
        filePath: "./songs/3.mp3",
        coverPath:"./covers/3.jpg"
    },
    {
        songName: "Silent Night",
        filePath: "./songs/4.mp3",
        coverPath:"./covers/4.jpg"
    },
    {
        songName: "Rock Around the Clock",
        filePath: "./songs/5.mp3",
        coverPath:"./covers/5.jpg"
    },
    {
        songName: "I Will Always Love You",
        filePath: "./songs/6.mp3",
        coverPath:"./covers/6.jpg"
    },
    {
        songName: "Something Just Like This",
        filePath: "./songs/7.mp3",
        coverPath:"./covers/7.jpg"
    },
    {
        songName: "Perfect",
        filePath: "./songs/8.mp3",
        coverPath:"./covers/8.jpg"
    },
    {
        songName: "Shape of You",
        filePath: "./songs/9.mp3",
        coverPath:"./covers/9.jpg"
    },
    {
        songName: "White Christmas",
        filePath: "./songs/10.mp3",
        coverPath:"./covers/10.jpg"
    }
]


songItem.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
let audioElement = new Audio('./songs/1.mp3');

// Handle Play Pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    // Update the seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

makeAllPlays = () =>{

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        currentSong.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${parseInt(songIndex) + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})

document.getElementById("next").addEventListener('click', () => {
    if(songIndex >= 9){
        songIndex = 0;
    }else{
        songIndex++;
    }
    audioElement.src = `songs/${parseInt(songIndex) + 1}.mp3`;
    currentSong.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById("previous").addEventListener('click', () => {
    if(songIndex <= 0){
        songIndex = 9;
    }else{
        songIndex--;
    }
    audioElement.src = `songs/${parseInt(songIndex) + 1}.mp3`;
    currentSong.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})