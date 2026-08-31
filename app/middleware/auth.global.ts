// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // Prevent executing on the server side during SSR
  if (import.meta.server) return

  const user = localStorage.getItem('google_user')

  // Redirect signed-in users away from the login page
  if (to.path === '/login' && user) {
    return navigateTo('/')
  }

  // Redirect unauthenticated users back to the login page
  if (to.path !== '/login' && !user) {
    return navigateTo('/login')
  }
})