module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        "radial-glow":
          "radial-gradient(58.31% 58.31% at 50% 50%, rgba(162, 156, 223, 0.0037) 0%, rgba(162, 156, 223, 0) 100%)",
      },
      boxShadow: {
        "mega-glow": `
          0 0 165.84px rgba(255, 255, 255, 0.37),
          0 0 331.68px rgba(255, 255, 255, 0.37),
          0 0 1160.88px rgba(255, 255, 255, 0.37),
          0 0 2321.76px rgba(255, 255, 255, 0.37),
          0 0 3980.16px rgba(255, 255, 255, 0.37),
          0 0 6965.28px rgba(255, 255, 255, 0.37)
        `,
      },
      keyframes: {
        horizontalScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        horizontalScroll: "horizontalScroll 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // shift by half if repeating
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      screens: {
        xl: "1500px", // Extra small devices
        "3xl": "1600px", // Extra large screens
        ultrawide: "1920px", // 4K monitors, etc.
      },
    },
  },
  plugins: [],
};
