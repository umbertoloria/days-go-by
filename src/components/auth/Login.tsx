import { backendLoginAction } from '../../remote/remote'

export const Login = () => {
	const urlParams = new URLSearchParams(window.location.search)
	const isFailed = typeof urlParams.get('failed') === 'string'

	return (
		<form
			method="post"
			action={backendLoginAction}
			class="bg-gray-300 w-80 p-2 radius"
		>
			<fieldset class="flex flex-col gap-2 items-center">
				<div class="flex gap-2 items-center">
					<label class="w-32">Username</label>
					<input
						type="text"
						name="username"
						class="w-full border-2 rounded"
						classList={{
							'border-blue-400': !isFailed,
							'border-red-400': isFailed,
						}}
					/>
				</div>
				<div class="flex gap-2 items-center">
					<label class="w-32">Password</label>
					<input
						type="password"
						name="password"
						class="w-full border-2 rounded"
						classList={{
							'border-blue-400': !isFailed,
							'border-red-400': isFailed,
						}}
					/>
				</div>
			</fieldset>
			<div class="w-full text-right">
				<button
					type="submit"
					class="bg-blue-500 text-white w-32 mt-2 mx-auto py-2 rounded-md
					shadow-md hover:shadow-lg transition"
				>Login</button>
			</div>
		</form>
	)
}
