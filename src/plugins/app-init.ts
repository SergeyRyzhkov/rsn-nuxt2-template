import { Context } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { ServiceLocator } from "@/_core/service/ServiceLocator";

export default (ctx: Context, inject: Inject) => {
  ServiceLocator.createFreshServiceLocator();
  ServiceLocator.instance.updateNuxtContext(ctx);
  inject("serviceLocator", ServiceLocator.instance);
};
