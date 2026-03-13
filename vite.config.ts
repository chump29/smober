import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import removeAttributes from "rollup-plugin-jsx-remove-attributes"
import version from "vite-plugin-package-version"
import simpleHtml from "vite-plugin-simple-html"
import webFontDownload from "vite-plugin-webfont-dl"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    react(),
    removeAttributes({
      usage: "vite"
    }),
    simpleHtml({
      minify: true,
      inject: {
        data: {
          title: "Sᴍᴏʙᴇᴙ Tᴙᴀᴄᴋᴇᴙ"
        }
      }
    }),
    tailwindcss(),
    version(),
    webFontDownload(
      [
        "https://fonts.googleapis.com/css2?family=Cairo+Play&display=swap"
      ],
      {
        assetsSubfolder: "fonts",
        injectAsStyleTag: false
      }
    )
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setup.ts",
    silent: true,
    include: [
      "./src/**/*.test.tsx"
    ],
    reporters: [
      [
        "verbose",
        {
          summary: true
        }
      ]
    ]
  }
})
