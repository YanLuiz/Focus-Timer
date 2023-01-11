// DOM

const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonSet = document.querySelector('.set')
const buttonSoundOn = document.querySelector('.sound-on')
const buttonSoundOff = document.querySelector('.sound-off')
const buttonAudio = document.querySelector('.audio')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
let minutes = minutesDisplay.textContent
let timerTimeOut
let finished  = false
let musicaAnt = -1



const musicas = ['audio/loseYourself.mp3', 'audio/notAfraid.mp3', 'audio/livingOnAPrayer.mp3','audio/theTrooper.mp3', 'audio/theFinalCountdown.mp3']

musicSorter()
function musicSorter() {
  let number  = Math.floor(Math.random() * musicas.length);
  if(musicaAnt == -1){
    buttonAudio.src = musicas[number]
    musicaAnt = number
  }else if(musicaAnt == number) {
    musicSorter()
  }else{
    buttonAudio.src = musicas[number]
    musicaAnt = number

  }
  
}


function resetControls() {
  updateTimerDisplay(minutes, 0)
  resetMusic()
  buttonStop.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
}

function updateTimerDisplay(minutes, seconds) {
  
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")

}

function playMusic() {
  buttonSoundOn.classList.remove('hide')
  buttonSoundOff.classList.add('hide')
  buttonAudio.play()
}

function pauseMusic() {
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')

  buttonAudio.pause()
}
function resetMusic() {
  buttonAudio.currentTime = 0
  pauseMusic()
  musicSorter()
}

async function countdown() {
  timerTimeOut = setTimeout(function() {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    
    if(minutes == 0 && seconds ==0) {
      setTimeout(function(){
        buttonAudio.src = 'audio/alarme.mp3'
        playMusic()
      },100)
      finished = true;
      resetControls()
      return
    }
    if(seconds == 0) {
      seconds = 60
      --minutes
    }
    updateTimerDisplay(minutes, seconds - 1)
    countdown()
  },1000)
}



buttonPlay.addEventListener('click', function() {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonSet.classList.add('hide')
  buttonStop.classList.remove('hide')
  playMusic()
  countdown()
})


buttonPause.addEventListener('click', function() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  pauseMusic()
  clearTimeout(timerTimeOut)  
})

buttonStop.addEventListener('click', function () {
  resetControls()
  clearTimeout(timerTimeOut)
})


buttonSoundOn.addEventListener('click', function () {
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
  pauseMusic()
  

})

buttonSoundOff.addEventListener('click', function () {
  buttonSoundOn.classList.remove('hide')
  buttonSoundOff.classList.add('hide')
  playMusic()
  

})

buttonSet.addEventListener('click', function() {
  minutes = prompt("Quantos minutos?") || minutes 
  updateTimerDisplay(minutes, 0)
})


buttonAudio.addEventListener('ended', function(){
  if(finished) {
    musicSorter()
    finished = false;
    return;
  }

    musicSorter()
    playMusic()

  
});