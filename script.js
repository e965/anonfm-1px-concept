'use strict'

let checkMediaSession = () => ('mediaSession' in navigator)

const stream = new Audio('https://anon.fm/streams/radio')

let getControl = controlName => document.querySelector(`.line button[data-control='${controlName}']`)

stream.preload = 'none'
stream.autoplay = ''
stream.controls = ''

stream.toggle = function(button) {
	let btnData = button.dataset

	if (this.paused) {
		this.load()
		btnData.state = 'loading'

		this.addEventListener('error', () => {
			btnData.state = 'stop'; return
		})

		this.addEventListener('canplay', () => {
			this.play()
			btnData.state = 'play'
		})

		if (checkMediaSession()) {
			navigator.mediaSession.playbackState = 'playing'
		}
	} else {
		this.pause()
		btnData.state = 'stop'

		if (checkMediaSession()) {
			navigator.mediaSession.playbackState = 'paused'
		}
	}
}

getControl('playpause').addEventListener('click', e => stream.toggle(e.target))

getControl('feedback').addEventListener('click', e => open('https://anon.fm/feedback/', 'feedback', `width=560, height=270, left=${screen.width/2 - 560/2}, top=${screen.height/2 - 235/2}, toolbar=no`))
