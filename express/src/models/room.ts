export interface Room {
  roomId: string
  name: string
  memberIds: string[]
  admins: string[]
}

export function newRoom(roomId: string): Room {
  return {
    roomId,
    name: '',
    memberIds: [],
    admins: []
  }
}
