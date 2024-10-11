/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'hr-dark': '#2E2E2F',
				'hr-light': '#F5F5F5',
				'hr-accent': '#9BAD28',
			},
			backgroundColor: {
				'hr-dark': 'rgba(62, 62, 63, var(--tw-bg-opacity))',
				'white': 'rgba(255, 255, 255, var(--tw-bg-opacity))',
			},
			backgroundOpacity: {
				'20': '0.2',
				'70': '0.7',
				'98': '0.98',
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
			borderRadius: {
				'custom': '6px',
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '4rem',
					xl: '5rem',
					'2xl': '6rem',
				},
			},
		},
	},
	plugins: [],
}
