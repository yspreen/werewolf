import { NightCycle, numberToCycle } from '@/models/room'
import { myRole, store } from './store'
import { Role } from '@/models/role'
import { AudioFile, playSound } from './audio'

export const allAudio: string[] = Object.values(AudioFile)
  .filter((val) => typeof val === 'string')
  .map((val) => `${val}`)

export async function cycleChanged() {
  store.showIfIDiedJustNow = false
  if (store.room?.nightCycle === NightCycle.DAY) playSound(AudioFile.day)

  const cycleNum = store.room?.nightCycle ?? 0
  const cycle = numberToCycle(cycleNum)

  if (cycle === NightCycle.THIEF) playSound(AudioFile.thief)
  if (cycle === NightCycle.CUPID) playSound(AudioFile.cupid)
  if (cycle === NightCycle.WEREWOLF) playSound(AudioFile.werewolves)
  if (cycle === NightCycle.SEER) playSound(AudioFile.seer)
  if (cycle === NightCycle.HUNTER) playSound(AudioFile.hunter)
  if (cycle === NightCycle.WITCH) playSound(AudioFile.witch)
  if (cycle === NightCycle.LOVERS) playSound(AudioFile.lovers)

  if (cycle === NightCycle.HUNTER) store.showIfIDiedJustNow = myRole.value === Role[Role.HUNTER]
}
