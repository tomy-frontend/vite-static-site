import { defineConfig } from "vite";
import { resolve } from "path";
import { globSync } from "glob";

export default defineConfig({
  root: "src",
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        globSync("src/**/*.html").map((file) => [
          file.slice(4, -5),
          resolve(__dirname, file),
        ])
      ),
      output: {
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(-1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name][extname]`;
        },
      },
    },
    target: "es2015",
    minify: "esbuild",
  },
  plugins: [
    {
      name: "html-transform",
      transformIndexHtml(html) {
        html = html.replace(
          /<script type="module" crossorigin src="\.\/assets\/js\/(.+?)\.js"><\/script>/,
          '<script src="./assets/js/$1.js" defer></script>'
        );
        html = html.replace(
          /<link rel="stylesheet" crossorigin href="(.+)">/,
          '<link rel="stylesheet" href="$1">'
        );
        return html;
      },
    },
  ],
});
