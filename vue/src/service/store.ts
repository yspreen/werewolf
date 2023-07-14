import type { User } from '@/models/user'
import { reactive } from 'vue'

export const store = reactive({
  user: null as User | null,
  users: {} as Record<string, User>
})
