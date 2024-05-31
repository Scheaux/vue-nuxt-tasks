import { useUserStore } from '~/src/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath === '/login') return
    const user = useUserStore()
    if (!user.checkAuthentication()) return navigateTo('/login')
})
