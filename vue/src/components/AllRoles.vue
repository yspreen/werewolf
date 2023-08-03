<template>
  <div>
    <template v-for="(role, i) in allRoles" :key="i">
      <div class="row mb-05" @click.prevent="showRole[i] = !showRole[i]">
        <u>{{ roleName(role) }}</u>
        {{ showRole[i] ? '▸' : '▾' }}
      </div>
      <div v-if="showRole[i]" v-html="descriptionFor(stringToRole(role))" class="mb-1"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { allRoles, roleName, stringToRole } from '@/models/role'
import { descriptionFor } from '@/service/helpText'
import { ref } from 'vue'

const showRole = ref({} as any)
</script>
