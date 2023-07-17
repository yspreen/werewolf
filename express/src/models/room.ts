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
}

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
    roleCount: {}
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

export function cycleNumber(cycle: NightCycle): number {
  return +cycle
}

export function numberToCycle(key: number): NightCycle {
  if (Object.values(NightCycle).filter((val) => typeof val === 'string').length > key)
    return key as NightCycle
  return NightCycle.DAY
}
