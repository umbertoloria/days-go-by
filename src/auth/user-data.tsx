import { useNavigate } from '@solidjs/router'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { authStatus } from '../remote/remote'
import { TAuthUser } from '../remote/sdk/types'

export const AuthContext = createContext<{
	user: Accessor<TAuthUser | undefined>
	isLoading: Accessor<boolean>
	refresh: () => void
}>()
export const AuthProvider = (props) => {
	const navigate = useNavigate()

	const [user, setUser] = createSignal<TAuthUser | undefined>()
	const [loading, setLoading] = createSignal(false)

	function refreshStatus() {
		if (!loading) {
			return
		}
		setLoading(true)
		authStatus()
			.then((authStatus) => {
				setUser(authStatus.user)
			})
			.catch((err) => {
				console.error(err)
				setUser()
				navigate('/login', {replace: true})
			})
			.finally(() => {
				setLoading(false)
			})
	}
	refreshStatus()
	
	return (
		<AuthContext.Provider value={{
			user,
			isLoading: loading,
			refresh() {
				refreshStatus()
			},
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export function useUser() {
	return useContext(AuthContext)
}
