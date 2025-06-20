module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        backgroundImage: {
          'gray-dots': 'radial-gradient(#ccc 0.7px, transparent 0.7px)',
        },
        backgroundSize: {
          'dot': '12px 12px',
        },
      },
    },
  };
  