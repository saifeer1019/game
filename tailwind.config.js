const { fontFamily } = require('tailwindcss/defaultTheme'); // Add this line

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		keyframes: {
			'loading-bar': {
			  '0%': { transform: 'translateX(-100%)' },
			  '100%': { transform: 'translateX(300%)' },
			}
		},
			animation: {
        'loading-bar': 'loading-bar 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
  		colors: {
			primary_: '#111111', // Deep black for a gaming dark theme
			secondary_: '#161618', // Slightly lighter dark gray for sections or containers
			accent_: '#d92365',
			hover_: '#b01d52',  // Bright orange-red for call-to-action buttons or highlights
			light_: '#e4e4e7', // Soft off-white for text
			muted_: '#7c7f87', // Muted gray for secondary text
  			primary: {
  				'50': '#fee2e2',
  				'100': '#fbd5d5',
  				'200': '#fba4a4',
  				'300': '#f87171',
  				'400': '#f75353',
  				'500': '#be185d',
  				'600': '#9a154d',
  				'700': '#7e123f',
  				'800': '#631c30',
  				'900': '#472523',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f5f5f4',
  				'100': '#e7e5e4',
  				'200': '#d6d3d1',
  				'300': '#a8a29e',
  				'400': '#78716c',
  				'500': '#1c1917',
  				'600': '#171412',
  				'700': '#111010',
  				'800': '#0c0a09',
  				'900': '#080706',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#fffbeb',
  				'100': '#fef3c7',
  				'200': '#fde68a',
  				'300': '#fcd34d',
  				'400': '#f59e0b',
  				'500': '#d97706',
  				'600': '#b45309',
  				'700': '#92400e',
  				'800': '#78350f',
  				'900': '#592c12',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			text: {
  				DEFAULT: '#f5f5f4',
  				muted: '#a8a29e'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'multi-color-gradient': 'linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)'
  		},
  		fontFamily: {
  			bebas: [
  				'var(--font-bebas-neue)',
                    ...fontFamily.sans
                ],
  			orbitron: [
  				'var(--font-orbitron)',
                    ...fontFamily.sans
                ],
  			inter: [
  				'var(--font-inter)',
                    ...fontFamily.sans
                ],
  			'roboto-condensed': [
  				'var(--font-roboto-condensed)',
                    ...fontFamily.sans
                ],
				'coolvetica': ['coolvetica', 'sans-serif'],
				sans: ['coolvetica', 'ui-sans-serif', 'system-ui'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};