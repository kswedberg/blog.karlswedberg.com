/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,mjs,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: null,
            },

            'code::after': {
              content: null,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

/**
 * light color-scheme:
 *  dark blue text: text-sky-800 hover:text-sky-700
 * light color-scheme:
 *  light slate text: dark:text-slate-200  dark:hover:text-slate-300"
 */
