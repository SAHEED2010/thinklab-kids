import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172338",
        paper: "#fffdf7",
        sky: "#dff4ff",
        mango: "#ffcb69",
        coral: "#ff8066",
        leaf: "#a8df8e",
        berry: "#7556c7",
      },
      boxShadow: {
        soft: "0 16px 45px rgba(23, 35, 56, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
