<template>
  <div class="flex items-center">
    <img src="/images/header_heart.svg" width="24" height="24" class="cursor-pointer" alt=" " />
    <div class="relative cursor-pointer">
      <img src="/images/header_shop.svg" width="22" height="22" class="ml-24" alt=" " />
      <div
        class="text-12 leading-14 w-18 h-18 bg-secondary absolute -right-12 -top-2 flex items-center justify-center rounded-full pl-1 text-white lg:ml-48"
      >
        {{ 1 }}
      </div>
    </div>
    <img src="/images/header_user.svg" alt=" " width="19" height="19" class="ml-24 cursor-pointer lg:ml-32" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheHeaderUser extends Vue {}
</script>
