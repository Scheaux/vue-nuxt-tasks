<script setup lang="ts">
import { useTaskStore } from '~/src/stores/task'

const taskStore = useTaskStore()
const taskForm = ref()
const dialog = ref(false)
const name = ref('')
const email = ref('')
const description = ref('')

const emailRules = [
    (value: string) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
        return 'Некорректный email'
    }
]

const nameRules = [
    (value: string) => {
        if (value.length < 3) return 'Название должно содержать больше 3 символов'
        if (value.length > 25) return 'Название должно содержать меньше 25 символов'
        return true
    }
]

const submit = async () => {
    const { valid } = await taskForm.value.validate()
    if (!valid) return

    taskStore.list.push({
        id: taskStore.list.length + 1,
        name: name.value,
        email: email.value,
        description: description.value,
        isComplete: false
    })

    dialog.value = false
    name.value = ''
    email.value = ''
    description.value = ''
}
</script>

<template>
    <div class="pa-4 text-center">
        <v-btn color="green" @click="dialog = !dialog">Новая задача</v-btn>

        <v-dialog v-model="dialog" max-width="400">
            <v-card class="pa-4">
                <v-form @submit.prevent @submit="submit" ref="taskForm">
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        counter
                        label="Наименование"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>

                    <v-text-field v-model="description" label="Описание"></v-text-field>

                    <v-btn class="mt-4" type="submit" color="primary" variant="tonal" block
                        >Сохранить</v-btn
                    >
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
