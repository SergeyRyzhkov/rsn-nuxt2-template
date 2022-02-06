import path from "path";
import { NuxtConfig } from "@nuxt/types";

const SRC_DIR: NuxtConfig["srcDir"] = "src/";

const nuxtConfig: NuxtConfig = {
  modern: true,
  srcDir: SRC_DIR,

  components: [
    { path: "@/components", pathPrefix: false },
    { path: "@/pages", pathPrefix: false },
    { path: "@/layouts", pathPrefix: false },
  ],

  loading: { color: "#2f80f3", height: "2px" },

  head: {
    htmlAttrs: {
      prefix: "og:http://ogp.me/ns#",
      lang: "ru",
    },
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no",
      },
    ],

    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],

    bodyAttrs: {
      itemscope: "",
      itemtype: "https://schema.org/WebPage",
    },
  },

  css: ["~/assets/styles/_index.scss"],

  plugins: [
    { src: "@/plugins/app-init" },
    { src: "@/plugins/directives" },
    { src: "@/plugins/vuelidate" },
    { src: "@/plugins/dayjs" },
    { src: "@/plugins/modal-manager.client" },
  ],

  router: {
    prefetchLinks: false,
    // middleware: ["requiresAuthorize"],
  },

  modules: ["@nuxtjs/axios", "cookie-universal-nuxt"],

  buildModules: [
    "@/_core/nuxt_modules/init-router-store.module.ts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/style-resources",
    "nuxt-webfontloader",
    [
      "@nuxt/typescript-build",
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true,
        eslint: true,
      },
    ],
  ],

  build: {
    optimizeCSS: true,

    extractCSS: {
      ignoreOrder: true,
    },

    optimization: {
      removeEmptyChunks: true,
      splitChunks: {
        chunks: "all",
      },
    },

    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
    },

    postcss: {
      plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js") as any,
        autoprefixer: {},
      },
      preset: {
        stage: 1,
      },
    },
  },

  render: {
    compressor: false,
    resourceHints: false,
    crossorigin: "anonymous",
    etag: false,
  },

  tailwindcss: {
    configPath: "~~/tailwind.config.js",
  },

  styleResources: {
    scss: ["~assets/styles/_variables.scss", "~assets/styles/_media.scss"],
  },

  webfontloader: {
    events: false,
    google: {
      families: ["Montserrat:500,600,700:cyrillic&display=swap"],
    },
  },

  axios: {
    baseURL: process.env.BASE_URL || "https://api.yarus.ru",
    // credentials: true,
  },

  server: {
    port: process.env.PORT || 8010,
    host: process.env.HOST || "localhost",
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || "https://api.yarus.ru",
    siteUrl: "",

    defaultMetaDescription: "",
    defaulMetaTitle: "",
    defaulMetaImgSrc: "",
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || "https://api.yarus.ru",
    },
  },
};

export default nuxtConfig;
