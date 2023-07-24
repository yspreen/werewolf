<script lang="ts" setup>
import { Role, roleName } from '@/models/role'
import { NightCycle } from '@/models/room'
import { api } from '@/service/api'
import { myRole, store } from '@/service/store'
import { computed, ref } from 'vue'

const rawChoices = computed(() => store.room?.thiefChoices ?? [])
const allWerewolf = computed(
  () =>
    rawChoices.value.length &&
    !rawChoices.value.filter((choice) => choice !== Role[Role.WEREWOLF]).length
)
const choices = computed(() =>
  (allWerewolf.value ? [] : [Role[Role.VILLAGER]]).concat(rawChoices.value)
)

const isThief = computed(() => {
  return myRole.value === Role[Role.THIEF]
})

const selected = ref(null as number | null)

async function choose(role: number | null) {
  if (role === null || !store.room) return
  store.room.nightCycle += 0.1
  store.room.v += 1
  await api.post('/thief', { roomId: store.room?.roomId, role: choices.value[role] })
}
</script>

<template>
  <div class="col" v-if="isThief && store.room?.nightCycle === NightCycle.THIEF">
    <div class="full-width">You're the thief, pick your role:</div>
    <div class="full-width">
      <div v-for="(role, i) in choices" :key="i" class="row">
        {{ roleName(role) }}
        <button class="btn" @click="selected = i" v-if="selected !== i">select</button>
      </div>
      <button class="btn" @click="choose(selected)" :class="selected !== null ? '' : 'danger'">
        <span>
          confirm
          {{ selected !== null ? roleName(choices[selected]) : '&lt; pick above &gt;' }}
        </span>
      </button>
    </div>
  </div>
</template>
