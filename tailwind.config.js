/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      transform: {
        30: "rotate(30deg)",
        "-30": "rotate(-30deg)",
        45: "rotate(45deg)",
        "-45": "rotate(-45deg)",
      },
    },
  },
  plugins: [],
});
