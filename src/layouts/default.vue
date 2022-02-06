<template>
  <div class="layout-wrapper relative">
    <TheHeader class="hidden lg:block"> </TheHeader>
    <TheMobileHeader class="block lg:hidden"></TheMobileHeader>
    <nuxt />
    <TheFooter></TheFooter>
    <client-only><BaseBackToTop></BaseBackToTop></client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class DefaultLayout extends Vue {
  public head() {
    const canonical = `${this.$config.siteUrl}${this.$route.path.toLowerCase()}`;
    return {
      link: [
        {
          rel: "canonical",
          href: canonical.endsWith("/") ? canonical.slice(0, -1) : canonical,
        },
      ],
    };
  }
}
</script>
