import { defineStore } from 'pinia'

export const useTaskStore = defineStore({
    id: 'tasks',
    state: () => ({
        list: [
            {
                id: 1,
                name: 'Задача 1',
                email: 'user@user.com',
                description: 'Сделать хорошо, плохо делать не надо',
                isComplete: true
            },
            {
                id: 2,
                name: 'Задача 2',
                email: 'admin@admin.com',
                description: '',
                isComplete: false
            },
            {
                id: 3,
                name: 'Задача 3',
                email: 'user@user.com',
                description: '',
                isComplete: false
            },
            {
                id: 4,
                name: 'Задача 4',
                email: 'user@user.com',
                description: '',
                isComplete: false
            },
            {
                id: 5,
                name: 'Задача 5',
                email: 'user@user.com',
                description: '',
                isComplete: false
            }
        ]
    })
})
