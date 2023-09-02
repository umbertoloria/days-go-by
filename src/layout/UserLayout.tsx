import { AuthProvider, useUser } from '../auth/user-data'
import { Navbar } from '../components/navbar/Navbar'

export const UserLayout = (props) => {
	return (
		<AuthProvider>
			<Navbar/>
			<UserLayoutInner>
				{props.children}
			</UserLayoutInner>
		</AuthProvider>
	)
}

const UserLayoutInner = (props) => {
	const { user } = useUser()
	return (<>
		{user() ? (<>
			{props.children}
		</>) : (<>
			{/* None */}
		</>)}
	</>)
}