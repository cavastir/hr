/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'hr-dark': '#3E3E3F',
				'hr-light': '#FFFFFF',
				'hr-accent': '#BBCF31',
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'bounce': 'bounce 1s infinite',
			},
			keyframes: {
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
			},
		},
	},
	plugins: [],
}
