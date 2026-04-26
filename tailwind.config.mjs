/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#07111f",
        ocean: "#102742",
        mint: "#4ce0b3",
        amber: "#ffb84d",
        cloud: "#ecf5ff",
        mist: "#9db4ca"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glow: "0 25px 80px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(76,224,179,0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(255,184,77,0.16), transparent 25%), linear-gradient(180deg, #07111f 0%, #0b1627 42%, #07111f 100%)"
      }
    }
  },
  plugins: []
};
