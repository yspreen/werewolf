import { NightCycle, numberToCycle } from '@/models/room'
import { store } from './store'

enum AudioFile {
  cupid,
  day,
  hunter,
  lovers,
  seer,
  thief,
  werewolves,
  win,
  witch
}

export const allAudio: string[] = Object.values(AudioFile)
  .filter((val) => typeof val === 'string')
  .map((val) => `${val}`)

export async function cycleChanged() {
  if (store.room?.nightCycle === NightCycle.DAY) playAudio(AudioFile.day)

  const cycleNum = store.room?.nightCycle ?? 0
  const cycle = numberToCycle(cycleNum)

  if (cycle === NightCycle.THIEF) playAudio(AudioFile.thief)
  if (cycle === NightCycle.CUPID) playAudio(AudioFile.cupid)
  if (cycle === NightCycle.WEREWOLF) playAudio(AudioFile.werewolves)
  if (cycle === NightCycle.SEER) playAudio(AudioFile.seer)
  if (cycle === NightCycle.HUNTER) playAudio(AudioFile.hunter)
  if (cycle === NightCycle.WITCH) playAudio(AudioFile.witch)
  if (cycle === NightCycle.LOVERS) playAudio(AudioFile.lovers)
}

export function vibrate() {
  console.log('vibrate')
  window.navigator.vibrate([100, 30, 100, 30, 100])
}

export function playAudio(file: AudioFile) {
  const name = AudioFile[file]
  if (!store.enableSound) return
  if (audios[name].src == emptySound) {
    audios[name].src = `/${name}.mp3`
    return
  }
  audios[name].src = emptySound
  setTimeout(() => {
    audios[name].src = `/${name}.mp3`
  }, 100)
}

const audios: Record<string, HTMLAudioElement> = {}

const emptySound =
  'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'

export function warmUpAudio() {
  allAudio.forEach((file) => {
    const soundEffect = new Audio()
    soundEffect.autoplay = true

    // onClick of first interaction on page before I need the sounds
    // (This is a tiny MP3 file that is silent and extremely short - retrieved from https://bigsoundbank.com and then modified)
    soundEffect.src = emptySound
    audios[file] = soundEffect
  })
}
