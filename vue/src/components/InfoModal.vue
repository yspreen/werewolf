<script setup lang="ts">
import { Role, roleName } from '@/models/role'
import { store } from '@/service/store'
import { descriptionFor, instructorInfo } from '@/service/helpText'
import { computed } from 'vue'
import AllRoles from './AllRoles.vue'

enum MODALS {
  NONE,
  MY_ROLE,
  ALL_ROLES,
  INSTRUCTOR
}

const modalBody = computed(() => {
  switch (modalShown.value) {
    case MODALS.MY_ROLE:
      return descriptionFor(store.showRoleInfo!)
    case MODALS.INSTRUCTOR:
      return instructorInfo

    default:
      return ''
  }
})
const modalHeader = computed(() => {
  switch (modalShown.value) {
    case MODALS.MY_ROLE:
      return roleName(Role[store.showRoleInfo!])
    case MODALS.INSTRUCTOR:
      return 'How To Play'
    case MODALS.ALL_ROLES:
      return 'Roles'

    default:
      return ''
  }
})
const modalShown = computed(() => {
  if (store.showRoleInfo !== null) return MODALS.MY_ROLE
  if (store.showInstructions) return MODALS.INSTRUCTOR
  if (store.showAllRoles) return MODALS.ALL_ROLES
  return MODALS.NONE
})

function close() {
  store.showRoleInfo = null
  store.showInstructions = false
  store.showAllRoles = false
}
</script>

<template>
  <div class="modal-bg" v-if="modalShown" @click="close">
    <div class="modal" @click.stop="() => {}">
      <div class="header" v-html="modalHeader" />
      <all-roles v-if="store.showAllRoles" />
      <div class="content" v-html="modalBody" v-else />
      <a class="x" @click="close" href="javascript:void(0)">x</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #00000020;
  body.night & {
    background: #ffffff30;
  }
  min-height: 100svh;
  padding: 1em;
}

.modal {
  position: relative;
  background: #ffffff;
  body.night & {
    background: #000000;
  }
  min-height: 50svh;
  max-width: 600px;
  margin: auto;
  & > div {
    padding: 1em;
  }
  .header {
    padding-bottom: 0;
    font-size: 1.5em;
  }
  .content {
    padding-bottom: 2em;
  }
}

.x {
  color: unset;
  display: inline-block;
  position: absolute;
  top: 0.3em;
  right: 0.7em;
  font-size: 1.5em;
}
</style>
