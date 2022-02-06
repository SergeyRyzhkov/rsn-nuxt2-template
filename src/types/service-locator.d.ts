import { ContextServiceRegistry as ContextServiceLocator } from "@/_core/service/ServiceLocator";

declare module "vue/types/vue" {
  interface Vue {
    $serviceLocator: ContextServiceLocator;
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$serviceRegistry inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $serviceLocator: ContextServiceLocator;
  }
  // nuxtContext.$serviceRegistry
  interface Context {
    $serviceLocator: ContextServiceLocator;
  }
}

declare module "vuex/types/index" {
  // this.$serviceRegistry inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $serviceLocator: ContextServiceLocator;
  }
}
