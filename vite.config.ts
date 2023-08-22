import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import checker from 'vite-plugin-checker'

export default defineConfig({
	plugins: [
		/* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
		// devtools(),
		solidPlugin(),
		checker({
			// e.g. use TypeScript check
			typescript: true,
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
})
