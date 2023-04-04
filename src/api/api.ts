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
        return instance.get<ItemType[]>("todo-lists")
    },
    removeToDo(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    createToDo(title: string) {
        return instance.post<ResponseType<{item: ItemType}>>("todo-lists", {title})
    },
    changeTitleToDo(id: string,title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    }
}


export type ItemType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType <T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

