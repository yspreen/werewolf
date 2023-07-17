import { NightCycle, numberToCycle } from '@/models/room'
import { isLover, myRole, store } from './store'
import { Role, stringToRole } from '@/models/role'

export async function cycleChanged() {
  if (store.room?.nightCycle === NightCycle.DAY) vibrate()
  const role = stringToRole(myRole.value)
  const cycleNum = store.room?.nightCycle ?? 0
  const cycle = numberToCycle(cycleNum)

  if (role === Role.THIEF && cycle === NightCycle.THIEF) vibrate()
  if (role === Role.CUPID && cycle === NightCycle.CUPID) vibrate()
  if (role === Role.WEREWOLF && cycle === NightCycle.WEREWOLF) vibrate()
  if (role === Role.SEER && cycle === NightCycle.SEER) vibrate()
  if (role === Role.HUNTER && cycle === NightCycle.HUNTER) vibrate()
  if (role === Role.WITCH && cycle === NightCycle.WITCH) vibrate()
  if (isLover && cycle === NightCycle.LOVERS) vibrate()
}

export function vibrate() {
  navigator.vibrate([100, 30, 100, 30, 100])
}
