module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Old Standard TT', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['GlyfariumDef', 'Old Standard TT', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'brand-custom': ['GlyfariumDef', 'serif'],
      },
      colors: {
        'brand-cream': '#f0f0f0', // Light Grey/Off-White
        'brand-blue': '#28376d',  // Deep Navy Blue
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};