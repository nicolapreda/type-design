module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        'brand-dark': '#2a1a1a', // Deep Brown/Burgundy
        'brand-red': '#a83232',  // Rust/Brick Red
        'brand-cream': '#f5f3ee', // Light Cream
      },
    },
  },
  plugins: [],
};