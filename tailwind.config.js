/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // In Tailwind v4, custom colors are defined differently than in v3
      // We'll use CSS variables for our AWS colors
      textColor: {
        "aws-orange": "var(--aws-orange)",
        "aws-blue": "var(--aws-blue)",
        "aws-light-gray": "var(--aws-light-gray)",
        "aws-lighter-gray": "var(--aws-lighter-gray)",
        "aws-text-gray": "var(--aws-text-gray)",
        "aws-success": "var(--aws-success)",
        "aws-error": "var(--aws-error)",
        "aws-warning": "var(--aws-warning)",
        "aws-info": "var(--aws-info)",
      },
      backgroundColor: {
        "aws-orange": "var(--aws-orange)",
        "aws-blue": "var(--aws-blue)",
        "aws-light-gray": "var(--aws-light-gray)",
        "aws-lighter-gray": "var(--aws-lighter-gray)",
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        sans: ["Amazon Ember", "sans-serif"],
      },
      boxShadow: {
        "aws-card": "var(--shadow-aws-card)",
        "aws-button": "var(--shadow-aws-button)",
      },
    },
  },
  plugins: [],
};
