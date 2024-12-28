module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		colors: {
		  primary: '#1e293b', // Dark theme background
		  secondary: '#334155', // Slightly lighter background
		  accent: '#10b981', // Vibrant green for buttons and accents
		  light: '#f3f4f6', // Light text
		  muted: '#94a3b8', // Muted text for secondary elements
		},
	  },
	},
	plugins: [],
  };
  