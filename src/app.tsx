import { useRoutes } from '@solidjs/router'
import type { Component } from 'solid-js'
import { Navbar } from './components/navbar/Navbar'
import { routes } from './routes'

const App: Component = () => {
	const Route = useRoutes(routes)

	return (<>
		<Navbar/>
		<main>
			<Route />
		</main>
	</>)
}

export default App
