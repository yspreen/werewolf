<script setup lang="ts">
import { store } from '@/service/store'
import type { Room } from '@/models/room'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/service/api'
import { loadUser } from '@/service/loadUser'
import { Role, roleName } from '@/models/role'
import { fetchMembers } from '@/service/fetchMembers'
import type { User } from '@/models/user'

const router = useRouter()
const room = ref(null as Room | null)

const members = computed(() => {
  let memberIds = room.value?.memberIds
  if (!memberIds) return []
  return memberIds.map((memberId) => store.users[memberId]).filter((user) => user)
})
const aliveMembers = computed(() => {
  return members.value.filter((member) => !room.value?.dead.includes(member.userId))
})

const reveal = ref(false)
const selectedUser = ref(null as string | null)
const revealedUser = ref(null as User | null)

const isThief = computed(() => {
  return myRole.value === Role[Role.THIEF]
})
const isCupid = computed(() => {
  return myRole.value === Role[Role.CUPID]
})
const isWerewolf = computed(() => {
  return myRole.value === Role[Role.WEREWOLF]
})
const isSeer = computed(() => {
  return myRole.value === Role[Role.SEER]
})
const isWitch = computed(() => {
  return myRole.value === Role[Role.WITCH]
})
const isDead = computed(() => {
  return room.value?.dead.includes(store.user?.userId ?? '') ?? false
})
const myRole = computed(() => {
  return room.value?.givenRoles?.[store.user?.userId ?? ''] ?? 'UNKNOWN'
})
const myRoleName = computed(() => {
  return roleName(myRole.value)
})
const roleLabel = computed(() => {
  return reveal.value ? myRoleName.value : '< reveal below >'
})
const isAdmin = computed(() => {
  return room.value?.admins.includes(store.user?.userId ?? '')
})

let interval = null as number | null

onMounted(async () => {
  await loadUser()
  await timer()
  interval = setInterval(() => timer().then(() => {}), 1000)
})

onUnmounted(() => {
  if (interval === null) return

  store.nightMode = false
  clearInterval(interval)
  interval = null
})

async function seerStep() {
  if (!selectedUser.value && !revealedUser.value) return
  if (revealedUser.value) {
    await advanceCycle()
    revealedUser.value = null
    return
  }
  revealedUser.value = store.users[selectedUser.value ?? '']
  selectedUser.value = null
}

const waitingForDelay = ref(false)
async function timer() {
  if (waitingForDelay.value) return
  const newRoom = (await api.get(`/room/${router.currentRoute.value.params.roomId}`)).room
  if (!newRoom) {
    return
  }
  if (!newRoom.memberIds.includes(store.user?.userId ?? '')) {
    return router.push('/')
  }
  await fetchMembers(newRoom)
  store.nightMode = newRoom.nightCycle > 0
  if (!room.value || room.value?.nightCycle === newRoom.nightCycle) {
    room.value = newRoom
    return
  }

  waitingForDelay.value = true
  setTimeout(() => {
    waitingForDelay.value = false
    room.value = newRoom
    newCycle().catch(console.error)
  }, 3000)
}

function vibrate() {
  navigator.vibrate([100, 30, 100, 30, 100])
}

async function newCycle() {
  if (room.value?.nightCycle === 0) vibrate()
}

let revealTimer = null as number | null
function toggleReveal() {
  revealTimer && clearTimeout(revealTimer)
  reveal.value = !reveal.value
  if (reveal.value) {
    revealTimer = setTimeout(() => {
      toggleReveal()
    }, 5000)
  }
}

async function advanceCycle() {
  await api.post('/advance-cycle', { roomId: room.value?.roomId })
  await timer()
}

async function killUser(userId: string | null) {
  selectedUser.value = null
  if (!userId) return
  await api.post('/kill', { userId, roomId: room.value?.roomId })
  await timer()
}
</script>

<template>
  <div class="col">
    <div class="row">My Role: {{ roleLabel }}</div>
    <div class="row">
      <button class="btn" @click="toggleReveal()">toggle role visibility</button>
    </div>
    <div
      class="row mt-1"
      v-if="!waitingForDelay && room?.diedTonight.length && room.nightCycle === 0"
    >
      These people died tonight:
      {{ room?.diedTonight.map((userId) => store.users[userId].name).join(', ') }}
    </div>
    <div
      class="row mt-1"
      v-if="!waitingForDelay && (isDead || room?.diedTonight.includes(store.user?.userId ?? ''))"
    >
      You died 💀
    </div>

    <div class="row mt-1" v-if="!waitingForDelay">
      <button class="btn" @click="advanceCycle" v-if="!isDead && room?.nightCycle === 0">
        start night
      </button>
      <div class="full-width" v-if="!isDead && isWerewolf && room?.nightCycle === 4">
        <div class="sm mb-1">
          Note: First person to click "kill" makes the decision. Make sure to vote with your fellow
          werewolfs before committing!
        </div>
        <div v-for="member in aliveMembers" :key="member.userId" class="row">
          {{ member.name }}
          <button
            class="btn"
            @click="selectedUser = member.userId"
            v-if="selectedUser !== member.userId"
          >
            select
          </button>
        </div>
        <button class="btn" :class="selectedUser ? '' : 'danger'" @click="killUser(selectedUser)">
          kill {{ store.users[selectedUser ?? '']?.name ?? '&lt; select &gt;' }}
        </button>
      </div>
      <div class="full-width" v-if="revealedUser">
        {{ revealedUser.name }} is
        {{ roleName(room?.givenRoles?.[revealedUser.userId] ?? 'UNKNOWN') }}
        <button class="btn" @click="seerStep()">continue</button>
      </div>
      <div class="full-width" v-if="!revealedUser && !isDead && isSeer && room?.nightCycle === 5">
        <div v-for="member in aliveMembers" :key="member.userId" class="row">
          {{ member.name }}
          <button
            class="btn"
            @click="selectedUser = member.userId"
            v-if="selectedUser !== member.userId"
          >
            select
          </button>
        </div>
        <button class="btn" :class="selectedUser ? '' : 'danger'" @click="seerStep()">
          reveal {{ store.users[selectedUser ?? '']?.name ?? '&lt; select &gt;' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
