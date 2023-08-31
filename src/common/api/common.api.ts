import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "c1ffb00b-dbe6-43ba-a16c-00936fc8ecfd",
  },
})
