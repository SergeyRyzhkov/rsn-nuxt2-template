import Vue from "vue";
import Router from "vue-router";
import { parse, stringify } from "query-string";

const routesImport = JSON.parse(`<%= JSON.stringify(options.routesImport) %>`);

Vue.use(Router);

export async function createRouter() {
  const routes = await getRoutes();

  const router = new Router({
    mode: "history",
    // @ts-ignore
    routes: [...routes],

    parseQuery(query) {
      return parse(query, { arrayFormat: "bracket" });
    },

    stringifyQuery(query) {
      const result = stringify(query, { arrayFormat: "bracket" });
      return result ? "?" + result : "";
    },

    scrollBehavior(to, from, _savedPosition) {
      if (to.name !== from.name) {
        // if (!!savedPosition) {
        //   return savedPosition;
        // } else {
        //   return { x: 0, y: 0 };
        // }

        return { x: 0, y: 0 };
      }
    },
  });

  return router;
}

const getRoutes = async () => {
  const routes = [];
  if (!!routesImport) {
    for (const iter of routesImport) {
      const part = iter.split("modules")[1];
      // @ts-ignore
      routes.push(...(await lazyLoad(import(`../src/modules${part}`))));
    }
  }

  return routes;
};

export const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
