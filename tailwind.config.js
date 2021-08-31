module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.vue"],
    safelist: [
      "grid-cols-1",
      "grid-cols-2",
      "grid-cols-3",
      "grid-cols-4",
      "grid-cols-5",
      "grid-cols-6",
      "sm:grid-cols-1",
      "sm:grid-cols-2",
      "sm:grid-cols-3",
      "sm:grid-cols-4",
      "sm:grid-cols-5",
      "sm:grid-cols-6",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
