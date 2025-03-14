console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('song/let me love you.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');

let songItems = Array.from(document.getElementsByClassName('songItem'));  



let songs = [
    { songName: "Perfect - Ed sheeran", filePath:"song/0.mp3", coverPath: "song img/perfect.jpeg", duration: "04:23" },
    { songName: "Adele - Skyfall", filePath:"song/1.mp3", coverPath:"song img/sky fall.jpeg", duration: "04:44" },
    { songName: "Coolio-Gangsta's Paradise", filePath:"song/2.mp3", coverPath: "song img/gangsta paradise.jpeg", duration: "04:00" },
    { songName: "Deva Deva- Brahmāstra  Arijit Singh", filePath:"song/3.mp3", coverPath: "song img/deva deva.jpeg", duration: "04:39" },
    { songName: "Love me like you do", filePath:"song/4.mp3", coverPath: "song img/love me like you do.jpeg", duration: "05:14" },
    { songName: "Eminem - Mockingbird", filePath:"song/5.mp3", coverPath: "song img/mockingbird.jpeg", duration: "04:10" },
    { songName: "Jay Sean - Ride It", filePath:"song/6.mp3", coverPath: "song img/ride it.jpeg", duration: "03:14" },
    { songName: "Let me Love You", filePath:"song/7.mp3", coverPath:"song img/let me love you.jpeg", duration: "03:26" },
    { songName: "Night Changes", filePath:"song/8.mp3", coverPath: "song img/night changes.jpeg", duration: "03:46" },
    { songName: "see you again", filePath:"song/9.mp3", coverPath: "song img/see you again.jpeg", duration: "03:54" },
  
];


// Initialize song items with data
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
       
});


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        document.querySelector('.songinfo img').style.opacity = 1;
        gif.style.opacity=1;
        
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        document.querySelector('.songinfo img').style.opacity = 0;
        gif.style.opacity=0;
    }
});

// Listen to timeupdate Event
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')
    // Update seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress)
    myProgressBar.value = progress;
});

// Handle seekbar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = ()=>{
     Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
       element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

const makeAllPause = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
      element.classList.remove('fa-play');
       element.classList.add('fa-pause');
   })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log("Clicked on: ", e.target);
        
        let clickedSongIndex = parseInt(e.target.id);

        // Check if the clicked song is already playing
        if (songIndex === clickedSongIndex && !audioElement.paused) {
            // If the same song is clicked and it's playing, pause it
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        } else {
            // Otherwise, play the new song
            makeAllPlays(); // Reset all buttons

            songIndex = clickedSongIndex;
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');

            audioElement.src = `song/${songIndex}.mp3`;
            mastersongname.innerText = songs[songIndex].songName;
            gif.style.opacity = 1;
            audioElement.currentTime = 0;
            audioElement.play();

            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
    });
});


document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=9){
        songIndex=0
    }
    else{
        songIndex += 1;
    } 
    mastersongname.innerText = songs[songIndex].songName; 
    audioElement.src=`song/${songIndex}.mp3`
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -= 1;
    }  
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.src=`song/${songIndex}.mp3`
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})







