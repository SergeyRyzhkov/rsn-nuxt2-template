import path, { relative, resolve } from "path";
import fs, { existsSync } from "fs";
import type { Module } from "@nuxt/types";

const initAppModule: Module = function () {
  // ============ components:true =========
  this.nuxt.hook("components:dirs", (dirs) => {
    const moduleDirs = getDirectories(resolve(this.options.srcDir, "modules"));

    if (!!moduleDirs) {
      moduleDirs.forEach((iter) => {
        const comp = resolve(iter, "components");
        if (existsSync(comp)) {
          dirs.push({
            path: comp,
            pathPrefix: false,
          });
        }
        const pages = resolve(iter, "pages");
        if (existsSync(pages)) {
          dirs.push({
            path: pages,
            pathPrefix: false,
          });
        }
      });
    }
  });

  // ============== Router =================
  // Disable parsing `pages/`
  this.nuxt.hook("build:before", () => {
    this.nuxt.options.build.createRoutes = () => {
      return [];
    };
  });

  const getRoutesImport = () => {
    const routeList = [];
    const moduleDirs = getDirectories(resolve(this.options.srcDir, "modules"));

    if (!!moduleDirs) {
      for (const iter of moduleDirs) {
        const routePath = resolve(iter, "routes");
        if (existsSync(routePath) && fs.readdirSync(routePath).length > 0) {
          const routerFilePath = relative(this.options.buildDir, routePath).replace(/\/+|\\+/g, "/");
          // @ts-ignore
          routeList.push(routerFilePath);
        }
      }
    }
    return routeList;
  };

  // Add plugin to import router file path as the main template for routing
  this.addPlugin({
    src: resolve(__dirname, "router.plugin.ts"), // path to plugin (my plugin)
    fileName: "router.js", // name js file in nuxt template folder (will be replaced)
    options: {
      routesImport: getRoutesImport(),
    },
  });
  // =================================================

  // ============== Vuex Store Modules =============
  const getStoreImport = () => {
    const routeList = [];
    const storeDirs = getDirectories(resolve(this.options.srcDir, "modules"));

    if (!!storeDirs) {
      for (const iter of storeDirs) {
        const storePath = resolve(iter, "store");
        if (existsSync(storePath) && fs.readdirSync(storePath).length > 0) {
          fs.readdirSync(storePath).forEach((iterFile) => {
            const storeFilePath = relative(this.options.buildDir, path.join(storePath, iterFile)).replace(/\/+|\\+/g, "/");
            // @ts-ignore
            routeList.push(storeFilePath);
          });
        }
      }
    }
    return routeList;
  };

  this.addPlugin({
    src: resolve(__dirname, "store.plugin.ts"),
    options: {
      modulesImport: getStoreImport(),
    },
  });
};
// =================================================

export const getDirectories = (srcpath) => {
  return fs
    .readdirSync(srcpath)
    .map((file) => path.join(srcpath, file))
    .filter((path) => fs.statSync(path).isDirectory());
};

export default initAppModule;
