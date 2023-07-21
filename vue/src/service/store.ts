import type { Role } from '@/models/role'
import type { Room } from '@/models/room'
import type { User } from '@/models/user'
import { computed, reactive } from 'vue'

export const store = reactive({
  user: null,
  room: null,
  users: {},
  nightMode: false,
  enableSound: false,
  showIfIDiedJustNow: false,
  showRoleInfo: null
}) as {
  user: User | null
  room: Room | null
  users: Record<string, User>
  nightMode: boolean
  enableSound: boolean
  showIfIDiedJustNow: boolean
  showRoleInfo: Role | null
}

export const isDead = computed(() => store.room?.dead.includes(store.user?.userId ?? '') ?? false)
export const isLover = computed(
  () => store.room?.lovers.includes(store.user?.userId ?? '') ?? false
)
export const members = computed(
  () => store.room?.memberIds?.map((memberId) => store.users[memberId]).filter((user) => user) ?? []
)
export const aliveMembers = computed(() =>
  members.value.filter((member) => !store.room?.dead.includes(member.userId))
)
export const futureAliveMembers = computed(() =>
  aliveMembers.value.filter((member) => !store.room?.diedTonight.includes(member.userId))
)
export const myRole = computed(
  () => store.room?.givenRoles?.[store.user?.userId ?? ''] ?? 'UNKNOWN'
)
