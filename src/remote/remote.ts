import axios from 'axios'
import { TCalendar } from './sdk/types'

const api = axios.create({
	baseURL: 'http://localhost:8000',
})

export const readCalendar = (id: number) => api.get(`calendar/${id}`)
	.then<TCalendar>(({ data}) => data)
