import axios from 'axios'
import { TAuthStatus, TCalendar } from './sdk/types'

const backendURL = 'http://localhost:8000'

const api = axios.create({
	baseURL: backendURL,
	withCredentials: true,
})

export const authStatus = () => api.get('auth/status')
	.then<TAuthStatus>(({ data}) => data)

export const readCalendar = (id: number) => api.get(`calendar/${id}`)
	.then<TCalendar>(({ data}) => data)

export const backendLoginAction = `${backendURL}/auth/login/password`
export const backendLogoutAction = `${backendURL}/auth/logout`
