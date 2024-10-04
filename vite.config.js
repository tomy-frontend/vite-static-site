import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import fs from "fs";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadTemplates() {
  const templateDir = resolve(__dirname, "src/templates");
  const templateFiles = glob.sync(`${templateDir}/*.html`);
  const templates = {};

  templateFiles.forEach((file) => {
    const name = file.split("/").pop().replace(".html", "");
    templates[name] = fs.readFileSync(file, "utf-8");
  });

  return templates;
}

export default defineConfig(({ command, mode }) => {
  let templates = loadTemplates();

  return {
    root: "src",
    base: "./",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      rollupOptions: {
        input: Object.fromEntries(
          glob
            .sync("src/**/*.html")
            .filter((file) => !file.includes("src/templates/"))
            .map((file) => [file.slice(4, -5), resolve(__dirname, file)])
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
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
          compilerOptions: {
            style: "expanded",
          },
        },
      },
    },
    optimizeDeps: {
      include: ["gsap", "gsap/ScrollTrigger"],
    },
    plugins: [
      {
        name: "html-transform",
        handleHotUpdate({ file, server }) {
          if (file.includes(resolve(__dirname, "src", "templates"))) {
            console.log("Template file changed:", file);
            templates = loadTemplates();
            server.ws.send({ type: "full-reload" });
            return [];
          }
        },
        transformIndexHtml: {
          order: "pre",
          handler(html, { path }) {
            Object.entries(templates).forEach(([name, content]) => {
              const placeholder = `<!-- ${name.toUpperCase()} -->`;
              html = html.replace(new RegExp(placeholder, "g"), content);
            });
            return html;
          },
        },
      },
      {
        name: "asset-transform",
        transformIndexHtml: {
          order: "post",
          handler(html, { path }) {
            if (command === "build") {
              html = html.replace(
                /src="\.\.\/assets\/img\//g,
                'src="./assets/img/'
              );
              html = html
                .replace(/src="\.\//g, 'src="./')
                .replace(/href="\.\//g, 'href="./');
              html = html.replace(
                /src="\.\/assets\/js\/(.+?)-\w+\.js"/g,
                'src="./assets/js/$1.js"'
              );
            }

            html = html.replace(
              /<script type="module" crossorigin src="(.+?)"><\/script>/g,
              (match, p1) => `<script src="${p1}" defer></script>`
            );
            html = html.replace(
              /<link rel="stylesheet" crossorigin href="(.+)">/g,
              (match, p1) => `<link rel="stylesheet" href="${p1}">`
            );

            return html;
          },
        },
      },
    ],
  };
});
