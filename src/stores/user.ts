import { defineStore } from 'pinia'

function apiLogin(email: string, password: string) {
    if (email === 'user@user.com' && password === '12345')
        return Promise.resolve({ email, name: 'user', role: 'user' })
    if (email === 'admin@admin.com' && password === '67890')
        return Promise.resolve({ email, name: 'admin', role: 'admin' })
    return Promise.reject(new Error('Неверный логин или пароль'))
}

interface UserCookie {
    value: {
        email: string
        name: string
        role: string
    }
}

interface User {
    email: string
    name: string
    role: string
}

function getUserCookie(): UserCookie {
    return useCookie('user')
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): User => ({
        email: getUserCookie()?.value?.email || '',
        name: getUserCookie()?.value?.name || '',
        role: getUserCookie()?.value?.role || 'user'
    }),

    actions: {
        logout() {
            this.$patch({
                email: '',
                name: '',
                role: ''
            })

            const user = useCookie('user')
            user.value = ''

            navigateTo('/login')
        },

        async login(email: string, password: string) {
            const userData = await apiLogin(email, password)
            const user = useCookie('user')
            user.value = JSON.stringify(userData)

            this.$patch({
                ...userData
            })

            return true
        },

        checkAuthentication() {
            const user = useCookie('user')
            return !!user.value
        }
    }
})
