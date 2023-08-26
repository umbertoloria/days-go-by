import axios from 'axios'
import { TCalendar } from './sdk/types'

const backendURL = 'http://localhost:8000'

const api = axios.create({
	baseURL: backendURL,
})

export const readCalendar = (id: number) => api.get(`calendar/${id}`)
	.then<TCalendar>(({ data}) => data)

export const backendLoginAction = `${backendURL}/auth/login/password`
