<script>
import { useUserStore } from '~/src/stores/user'

export default {
    data: () => ({
        email: '',
        password: '',
        passwordVisible: false,
        errorBar: false,
        errorText: '',
        emailRules: [
            (value) => {
                if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
                return 'Некорректный email'
            }
        ]
    }),
    methods: {
        async handleSubmit() {
            const user = useUserStore()
            try {
                await user.login(this.email, this.password)
                navigateTo('/tasks')
            } catch (e) {
                this.errorBar = true
                this.errorText = e
            }
        }
    }
}
</script>

<template>
    <v-sheet class="mx-auto" width="600">
        <v-form @submit.prevent @submit="handleSubmit">
            <v-text-field v-model="email" :rules="emailRules" label="Логин"></v-text-field>
            <v-text-field
                v-model="password"
                :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwordVisible ? 'text' : 'password'"
                label="Пароль"
                counter
                @click:append-inner="passwordVisible = !passwordVisible"
            ></v-text-field>
            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>

        <v-snackbar color="error" v-model="errorBar" timeout="2000">{{ errorText }}</v-snackbar>
    </v-sheet>
</template>
