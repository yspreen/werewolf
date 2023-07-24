import { store } from './store'

const AUDIO_BUFFER_SIZE = 5

export async function warmUp() {
  if (audios.length) return
  for (let index = 0; index < AUDIO_BUFFER_SIZE; index++) {
    const soundEffect = new Audio()
    soundEffect.autoplay = true

    // onClick of first interaction on page before I need the sounds
    // (This is a tiny MP3 file that is silent and extremely short - retrieved from https://bigsoundbank.com and then modified)
    soundEffect.src = emptySound
    audios.push(soundEffect)
  }
}
export async function playSound(file: AudioFile, forcePlay: boolean = false) {
  const name = AudioFile[file]
  if (!store.enableSound && !forcePlay) return
  audios[currentAudio].src = `/${name}.mp3`
  currentAudio = (currentAudio + 1) % AUDIO_BUFFER_SIZE
  audios[(currentAudio + 1) % AUDIO_BUFFER_SIZE].src = emptySound
}

export enum AudioFile {
  cupid,
  cupidWalk,
  day,
  hunter,
  lovers,
  seer,
  thief,
  werewolves,
  win,
  witch,
  alarm
}

let currentAudio = 0

const audios: HTMLAudioElement[] = []

const emptySound =
  'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
