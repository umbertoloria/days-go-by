import { Link, useLocation } from '@solidjs/router'
import { Show } from 'solid-js'
import { useUser } from '../../auth/user-data'
import { backendLogoutAction } from '../../remote/remote'

export const Navbar = () => {
	const location = useLocation()
	const { user } = useUser()

	return (
		<nav class="bg-gray-200 text-gray-900 px-4">
			<ul class="flex items-center">
				<li class="py-2 px-4">
					<Link href="/" class="no-underline hover:underline">
						Home
					</Link>
				</li>
				<Show
					when={!!user()}
					fallback={
						<li class="py-2 px-4">
							{/* Consider "isLoading" to disable click */}
							<Link href="/login" class="no-underline hover:underline">
								Login
							</Link>
						</li>
					}>
					<li class="py-2 px-4">
						<Link href="/account" class="no-underline hover:underline">
							{user().email}
						</Link>
					</li>
					<li class="py-2 px-4">
						<Link href={backendLogoutAction} class="no-underline hover:underline">
							Logout
						</Link>
					</li>
				</Show>
				
				<li class="py-2 px-4">
					<Link href="/about" class="no-underline hover:underline">
						About
					</Link>
				</li>
				<li class="py-2 px-4">
					<Link href="/error" class="no-underline hover:underline">
						Error
					</Link>
				</li>

				<li class="text-sm flex items-center space-x-1 ml-auto">
					<span>URL:</span>
					<input
						class="w-75px p-1 bg-white text-sm rounded-lg"
						type="text"
						readOnly
						value={location.pathname}
					/>
				</li>
			</ul>
		</nav>
	)
}
