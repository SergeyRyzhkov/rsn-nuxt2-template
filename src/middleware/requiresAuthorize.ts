import { Context } from "@nuxt/types";
// import { AuthService } from "@/modules/Auth/AuthService";

const requiresAuthorize = (_ctx: Context) => {
  // const isRequiresAuthStartup = ctx.route.matched.some((record) => record.meta?.requiresAuthStartup);
  // const isRequiresAuthFacility = ctx.route.matched.some((record) => record.meta?.requiresAuthFacility);
  // if (isRequiresAuthStartup || isRequiresAuthFacility) {
  //   let isAllowed = false;
  //   isAllowed =
  //     ctx.$serviceLocator.getService(AuthService).isAuthenticated &&
  //     ((isRequiresAuthStartup && ctx.$serviceLocator.getService(AuthService).isUserStartup) ||
  //       (isRequiresAuthFacility && ctx.$serviceLocator.getService(AuthService).isUserFacility));
  //   if (!isAllowed) {
  //     return ctx.redirect({
  //       name: "main",
  //     });
  //   }
  // }
};

export default requiresAuthorize;
