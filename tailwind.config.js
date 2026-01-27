module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'brand-custom': ['GlyfariumDef', 'serif'],
      },
      colors: {
        'brand-cream': '#f0f0f0', // Light Grey/Off-White
        'brand-blue': '#28376d',  // Deep Navy Blue
      },
    },
  },
  plugins: [],
};