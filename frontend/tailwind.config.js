module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk', sans-serif"],
        mono: ["'Space Mono', monospace"],
      },
      boxShadow: {
        'neo-sm': '2px 2px 0 0 rgb(0 0 0 / 1)',
        'neo': '4px 4px 0 0 rgb(0 0 0 / 1)',
        'neo-lg': '8px 8px 0 0 rgb(0 0 0 / 1)',
      },
      backgroundImage: {
        "grid-green-400/30":
          "linear-gradient(to right, #4ade80/30 1px, transparent 1px), linear-gradient(to bottom, #4ade80/30 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-8": "8px 8px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "slide-in-up": {
          from: { transform: "translateY(10px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-up": "slide-in-up 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards",
        "bounce-subtle": "bounce-subtle 1.3s cubic-bezier(0.19, 1, 0.22, 1) infinite",
      },
      transitionTimingFunction: {
        'neo-easing': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

