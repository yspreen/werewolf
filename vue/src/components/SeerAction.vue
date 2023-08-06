<script lang="ts" setup>
import { Role } from '@/models/role'
import { NightCycle } from '@/models/room'
import type { User } from '@/models/user'
import { advanceCycle } from '@/service/advanceCycle'
import { aliveMembers, myRole, store } from '@/service/store'
import { computed, ref } from 'vue'

const selectedUser = ref(null as string | null)
const revealed = ref(null as User | null)

const isSeer = computed(() => myRole.value === Role[Role.SEER])
const revealedRole = computed(() =>
  store.room?.givenRoles?.[revealed.value?.userId ?? ''] == Role[Role.WEREWOLF]
    ? 'Werewolf 🐺'
    : 'Village Ally 🧑‍🌾'
)

async function seerStep() {
  if (!revealed.value && !selectedUser.value) return
  if (revealed.value) {
    await advanceCycle()
    revealed.value = null
    return
  }
  revealed.value = store.users[selectedUser.value ?? '']
  selectedUser.value = null
}
</script>

<template>
  <template v-if="isSeer && store.room?.nightCycle === NightCycle.SEER">
    <div class="full-width" v-if="revealed">
      {{ revealed?.name }} is
      {{ revealedRole }}
      <button class="btn" @click="seerStep()">continue</button>
    </div>
    <div class="full-width" v-else>
      <div v-for="member in aliveMembers" :key="member.userId" class="row">
        {{ member.name }} {{ member.userId === store.user?.userId ? '(me)' : '' }}
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
  </template>
</template>
