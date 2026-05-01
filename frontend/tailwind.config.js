/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        accent: "#3B82F6",
        theme: {
          bg: "var(--bg-primary)",
          "bg-secondary": "var(--bg-secondary)",
          card: "var(--bg-card)",
          elevated: "var(--bg-elevated)",
          text: "var(--text-primary)",
          "text-secondary": "var(--text-secondary)",
          muted: "var(--text-muted)",
          border: "var(--border-color)",
          "border-subtle": "var(--border-subtle)",
          accent: "var(--accent-color)",
          inverse: "var(--surface-inverse)",
          "text-inverse": "var(--text-inverse)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
