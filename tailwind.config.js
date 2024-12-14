/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-login":
          "linear-gradient(90deg, rgba(156,252,213,1) 0%, rgba(140,101,179,1) 50%, rgba(200,66,179,1) 100%)",
        "gradient-login-reversed":
          "linear-gradient(90deg, rgba(200,66,179,1) 0%, rgba(140,101,179,1) 50%, rgba(156,252,213,1) 100%)",
      },
    },
  },
  plugins: [],
};
