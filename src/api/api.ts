import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '2a8c69e4-572a-4487-8ff6-116dea09581f'
    },
    withCredentials: true
});

export const api = {
    getToDo() {
        return instance.get<TodolistType[]>("todo-lists")
    }
}





export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
