import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        copper: {
          50: "#fff5ec",
          100: "#ffe7d3",
          300: "#d89b64",
          500: "#b86f36",
          700: "#7c421e"
        },
        graphite: "#0b0d10",
        steel: "#161a20"
      },
      boxShadow: {
        copper: "0 0 70px rgba(184,111,54,0.18)"
      }
    }
  },
  plugins: [],
};
export default config;
