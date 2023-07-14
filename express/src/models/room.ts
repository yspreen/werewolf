export interface Room {
  roomId: string
  name: string
  memberIds: string[]
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

/**

Cycles:

0: day
1: thief
2: cupid
3: lovers
4: werewolf
5: seer
6: witch

**/
