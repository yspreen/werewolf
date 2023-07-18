import { allRoles } from './role'

export type WINNER = 'LOVERS' | 'VILLAGERS' | 'WEREWOLVES' | 'JESTER'

export interface Room {
  roomId: string
  name: string
  memberIds: string[]
  lovers: string[]
  dead: string[]
  admins: string[]
  givenRoles: Record<string, string> | null
  diedTonight: string[]
  nightCycle: number
  loversShown: boolean
  skipOneWerewolfNight: boolean
  roleCount: Record<string, number>
  witchPotions: number[]
  winner: WINNER | null
  thiefChoices: string[]
}

const emptyRoles: Record<string, number> = {}
allRoles.forEach((role) => {
  emptyRoles[role] = 0
})

export function newRoom(roomId: string): Room {
  return {
    roomId,
    name: '',
    memberIds: [],
    lovers: [],
    dead: [],
    admins: [],
    givenRoles: null,
    diedTonight: [],
    nightCycle: 0,
    loversShown: false,
    skipOneWerewolfNight: false,
    roleCount: emptyRoles,
    witchPotions: [1, 1],
    winner: null,
    thiefChoices: []
  }
}

export enum NightCycle {
  DAY,
  THIEF,
  CUPID,
  LOVERS,
  WEREWOLF,
  SEER,
  WITCH,
  HUNTER
}

export const allCycles: number[] = Object.values(NightCycle)
  .filter((val) => typeof val === 'number')
  .map((val) => +val)

export const CYCLE_COUNT = allCycles.length

export function cycleNumber(cycle: NightCycle): number {
  return +cycle
}

export function numberToCycle(key: number): NightCycle {
  if (CYCLE_COUNT > key) return key as NightCycle
  return NightCycle.DAY
}
