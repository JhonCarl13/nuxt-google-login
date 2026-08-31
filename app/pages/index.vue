<!-- pages/index.vue -->
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card v-if="user" width="450" class="pa-6 rounded-xl text-center">
      <div class="d-flex align-center ga-4 mb-6 text-left">
        <v-avatar size="64">
          <v-img :src="user.picture" alt="Profile Picture" />
        </v-avatar>
        <div>
          <h2 class="text-h6 font-weight-bold">{{ user.name }}</h2>
          <p class="text-body-2 text-medium-emphasis">{{ user.email }}</p>
        </div>
      </div>

      <v-divider class="mb-4" />

      <v-btn color="error" block variant="tonal" @click="logout">
        Logout
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
const user = ref<any>(null)

onMounted(() => {
  const savedUser = localStorage.getItem('google_user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})

const logout = () => {
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')
  navigateTo('/login')
}
</script>