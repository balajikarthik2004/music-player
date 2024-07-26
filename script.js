const content = document.querySelector(".content"),
Playimage = content.querySelector(".music-image img"),
musicName = content.querySelector(".music-title .name"),
musicArtist = content.querySelector(".music-title .artist"),
Audio = document.querySelector(".main-song"),
playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
prevBtn = content.querySelector("#prev"),
nextBtn = content.querySelector("#next"),
progressBar = content.querySelector(".progress-bar"),
progressDetails = content.querySelector(".progress-details"),
repeatBtn = content.querySelector("#repeat");
shuffleBtn = content.querySelector("#shuffle")



let index = 2;

window.addEventListener("load",() => {
    loadData(index);
    // Audio.play()
})

function loadData(indexValue){
    musicName.innerHTML = songs[indexValue - 1].name;
    musicArtist.innerHTML = songs[indexValue - 1].artist;
    Playimage.src = "images/"+songs[indexValue -1].img+".jpg";
    Audio.src = "music/"+songs[indexValue -1].audio+".mp3";
}

playBtn.addEventListener("click",() => {
    const isMusicPaused = content.classList.contains("paused");
    if(isMusicPaused){
        pauseSong();
    }else{
        palySong();
    }
});

function palySong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML = 'pause';
    Audio.play()
}

function pauseSong(){
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    Audio.pause();
}

nextBtn.addEventListener("click", () => {
    nextSong();
});

prevBtn.addEventListener("click", ()=>{
    prevSong();
});

function nextSong(){
    index++;
    if(index > songs.length){
        index = 1;
    }else{
        index = index;
    }
    loadData(index);
    palySong();
}

function prevSong(){
    index--;
    if(index <= 0){
        index = 1;
    }
    else{
        index = index
    }
    loadData(index);
    palySong()
}


Audio.addEventListener("timeupdate",(e)=>{
    console.log(e);
    const initialTime = e.target.currentTime;
    const finalTime = e.target.duration;
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth+"%"

    
    progressDetails.addEventListener("click",(e)=>{
        let progressValue = progressDetails.clientWidth;
        let clickedOffsetX = e.offsetX;
        let MusicDuration = Audio.duration;

    Audio.currentTime = (clickedOffsetX / progressValue)* MusicDuration;
    });

    //time Logic
    Audio.addEventListener("loadeddata", ()=>{
        let finalTimeData = content.querySelector(".final")

        let AudioDuration = Audio.duration;
        let finalMinites = Math.floor(AudioDuration / 60);
        let finalSeconds = Math.floor(AudioDuration % 60);
        if(finalSeconds < 10){
            finalSeconds = '0'+finalSeconds;
        }
        finalTimeData.innerHTML = finalMinites+":"+finalSeconds;
    })

    //upadte Current Duration
    let currentTimeData = content.querySelector(".current");

    let currentTime = Audio.currentTime;
    let currentMinutes = Math.floor(currentTime /60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
        currentSeconds = '0' + currentSeconds;
    }
    currentTimeData.innerHTML = currentMinutes+":"+currentSeconds;

    //repeat butten logic
    repeatBtn.addEventListener("click",()=>{
        Audio.currentTime = 0;
    })

})

//shuffle butten logic

shuffleBtn.addEventListener("click",()=>{
    var randIndex = Math.floor(Math.random() * songs.length)+1;

    loadData(randIndex);
    palySong()
}) 

Audio.addEventListener("ended", ()=>{
    index++;
    if(index > songs.length){
        index = 1;
    }
    loadData(index);
    palySong()
})