const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressFilled = player.querySelector('.progress__filled')
const toggleBtn = player.querySelector('.player__button')
const ranges = player.querySelectorAll('input[type="range"]')
const skipBtns = player.querySelectorAll('[data-skip]')

function toggleVideo() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    toggleBtn.textContent = icon
}

function updateProgress() {
    const progress = (video.currentTime / video.duration) * 100
    progressFilled.style.flexBasis = `${progress}%`
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function rangeUpdate() {
    video[this.name] = this.value
}

function handleProgress(e) {
    const currentTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = currentTime
}

toggleBtn.addEventListener('click', toggleVideo)
video.addEventListener('click', toggleVideo)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', updateProgress)

skipBtns.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', rangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate))

let mousedown = false
progress.addEventListener('click', handleProgress)
progress.addEventListener('mousedown', _ => mousedown = true)
progress.addEventListener('mouseup', _ => mousedown = false)
progress.addEventListener('mousemove', (e) => mousedown && handleProgress(e))

