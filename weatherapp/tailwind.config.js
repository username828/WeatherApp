// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        rain: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(10px)" },
        },
        snow: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(5px) rotate(10deg)" },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite', // Floating animation for clouds
        glow: 'glow 2s ease-in-out infinite',    // Glowing effect for sun
        rain: "rain 3s linear infinite",
        snow: "snow 2s linear infinite",
      },
    },
  },
  plugins: [],
};
