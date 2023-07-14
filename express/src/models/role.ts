export enum Role {
  VILLAGER,
  WEREWOLF,
  SEER,
  WITCH,
  HUNTER,
  THIEF,
  CUPID,
  LITTLE_GIRL,
  DISEASED
}

export const allRoles: string[] = Object.values(Role)
  .filter((val) => typeof val === 'string')
  .map((val) => `${val}`)

export function roleName(role: string | Role): string {
  return `${role}`
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
