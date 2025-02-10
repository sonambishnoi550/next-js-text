import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["inter", "serif"],
			},
			colors: {
				gray: "#656566",
				lightGray: "#D0D5DD",
				darkGray: "#475467",
				blue: "#007BFF",
			},
		},
	},
	plugins: [],
} satisfies Config;