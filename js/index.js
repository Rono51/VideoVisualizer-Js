const Video = document.querySelector('.video')

const videosMain = ['Perro.mp4', 'Perrú.mp4','Fish.mp4','PeruTurism.mp4']

const buttonPlayOrPause = document.querySelector('.buttonPlay')
const buttonExtended = document.querySelector('.buttonExpand')
const buttonVolume = document.querySelector('.buttonAudio')
const InputProgessBar = document.querySelector('.progessBar')
const inputRangeVolume = document.querySelector('.InputVolume')
const TimeVideo = document.querySelector('.timeVideo')
const buttonRepeatVideo = document.querySelector('.LoopVideo')
const EndedShow = document.querySelector('.EndedShow')
const buttonPrevVideo = document.querySelector('.PrevVideo')
const buttonNextVideo = document.querySelector('.NextVideo')

let actualIndexVideo = 0;


Video.addEventListener('click',() => PlayPauseVideo())
buttonPlayOrPause.addEventListener('click',() => PlayPauseVideo())
Video.addEventListener('timeupdate',() => CurrentVideoAction() )
Video.addEventListener('ended',() => EndedVideo() )


function PlayPauseVideo(){
    if(Video.paused == true){
        Video.play()
        buttonPlayOrPause.firstElementChild.classList.replace('fa-play','fa-pause')

    }else{
        Video.pause()
        buttonPlayOrPause.firstElementChild.classList.replace('fa-pause','fa-play')

    }

}

buttonExtended.addEventListener('click',()=>{
    Video.requestFullscreen()

})

buttonVolume.addEventListener('click',() => {
    inputRangeVolume.classList.toggle('active')

})

inputRangeVolume.addEventListener('change',()=> {

    Video.volume = inputRangeVolume.value / 100

    IconChange();

})

function IconChange() {
    if(inputRangeVolume.value == 0){
        buttonVolume.firstElementChild.classList.replace('fa-volume-up','fa-volume-mute')
    
    }else{
        buttonVolume.firstElementChild.classList.replace('fa-volume-mute','fa-volume-up')

    }

}


function CurrentVideoAction() {

    InputProgessBar.value = Number( (Video.currentTime / Video.duration) * 100 )

    TimeVideoActual();

}

function TimeVideoActual() {

    let minutes = Math.floor( Video.currentTime / 60 )
    let seconds = Math.floor( Video.currentTime - minutes * 60 )
    let minutesValue;
    let secondsValue;

    if( minutes < 10 ){
        minutesValue = '0' + minutes

    } else{
        minutesValue = minutes

    }

    // Seconds

    if( seconds < 10 ){
        secondsValue = '0' + seconds

    } else{
        secondsValue = seconds

    }

    TimeVideo.textContent = minutesValue + ':' + secondsValue 
}

InputProgessBar.addEventListener('change', () => {
    Video.currentTime = Number( (InputProgessBar.value * Video.duration) / 100  )

})



function EndedVideo() {

    buttonPlayOrPause.firstElementChild.classList.replace('fa-pause','fa-play')
    EndedShow.classList.add('active')

}




buttonRepeatVideo.addEventListener('click',() =>{
    Video.currentTime = 0
    EndedShow.classList.remove('active')
    Video.play()
    buttonPlayOrPause.firstElementChild.classList.replace('fa-play','fa-pause')

})

function NextVideoPlayer() {
    actualIndexVideo++;

    if( actualIndexVideo == videosMain.length ){
        actualIndexVideo = 0
    }

    Video.src = '/videos/' + videosMain[actualIndexVideo]
    EndedShow.classList.remove('active')
    Video.play()
    buttonPlayOrPause.firstElementChild.classList.replace('fa-play','fa-pause')

}

buttonNextVideo.addEventListener('click' , () => {
    NextVideoPlayer();

})

buttonPrevVideo.addEventListener('click', () => {
    actualIndexVideo--;

    if(actualIndexVideo == -1){
        actualIndexVideo = videosMain.length - 1

    }

    Video.src = '/videos/' + videosMain[actualIndexVideo]
    EndedShow.classList.remove('active')
    Video.play()
    buttonPlayOrPause.firstElementChild.classList.replace('fa-play','fa-pause')

})


