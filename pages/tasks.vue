<script>
import { useTaskStore } from '~/src/stores/task'
import { useUserStore } from '~/src/stores/user'

export default {
    setup() {
        const taskStore = useTaskStore()
        const user = useUserStore()

        return {
            tasks: taskStore.list,
            user
        }
    },

    data: () => ({
        search: '',
        itemsPerPage: 3,
        editModeId: null,
        headers: [
            { title: '№', key: 'id' },
            { title: 'Наименование', key: 'name' },
            { title: 'e-mail', key: 'email' },
            { title: 'Описание', key: 'description' },
            { title: 'Статус', key: 'isComplete' },
            { title: 'Действия', key: 'actions', sortable: false }
        ]
    }),

    computed: {
        pageCount() {
            return Math.ceil(this.tasks.length / this.itemsPerPage)
        }
    },

    methods: {
        filter(value, query) {
            return (
                value != null &&
                query != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) !== -1
            )
        }
    }
}
</script>

<template>
    <v-app-bar elevation="2" class="position-relative">
        <v-app-bar-title>
            <v-text-field v-model="search" hide-details label="Поиск"></v-text-field>
        </v-app-bar-title>

        <template v-slot:append>
            <NewTaskForm />
            <v-btn color="red" @click="user.logout()">Выйти</v-btn>
        </template>
    </v-app-bar>

    <v-data-table
        :headers="headers"
        :items="tasks"
        :items-per-page="itemsPerPage"
        :search="search"
        :items-per-page-options="[3]"
    >
        <template v-slot:item.id="{ item }">
            <div class="me-2" size="small">{{ item.id }}</div>
        </template>

        <template v-slot:item.name="{ item }">
            <div v-if="editModeId !== item.id" class="me-2" size="small">{{ item.name }}</div>
            <v-text-field
                class="my-auto"
                hide-details="auto"
                v-if="editModeId === item.id"
                v-model="item.name"
            ></v-text-field>
        </template>

        <template v-slot:item.isComplete="{ item }">
            <div v-if="editModeId !== item.id" class="me-2" size="small">
                {{ item.isComplete ? 'Выполнена' : 'Не выполнена' }}
            </div>
            <v-checkbox v-if="editModeId === item.id" v-model="item.isComplete"></v-checkbox>
        </template>

        <template v-if="user.role === 'admin'" v-slot:item.actions="{ item }">
            <v-icon
                v-if="editModeId !== item.id"
                class="me-2"
                size="small"
                @click="editModeId = item.id"
                >mdi-pencil</v-icon
            >
            <v-icon
                v-if="editModeId === item.id"
                class="me-2"
                size="small"
                @click="editModeId = null"
                >mdi-content-save</v-icon
            >
        </template>
    </v-data-table>
</template>
