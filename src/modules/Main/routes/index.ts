const routes = [
  {
    name: "main",
    path: "/",
    component: () => lazyLoad(import("@/modules/Main/pages/MainPage.vue")),
  },

  {
    name: "error-page",
    path: "/app/error",
    component: () => lazyLoad(import("@/components/base/BaseNotFound.vue")),
    props: true,
  },
  {
    name: "not-found",
    path: "*",
    component: () => lazyLoad(import("@/components/base/BaseNotFound.vue")),
    props: { status: 404 },
  },
];

export default routes;

const lazyLoad = (promise) => {
  return promise.then((m) => m.default || m);
};
