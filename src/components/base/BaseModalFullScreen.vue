<template>
  <div class="flex h-full min-h-full">
    <div class="hidden md:block md:w-1/2 lg:w-7/12"></div>
    <div class="p-18 flex w-full flex-col bg-white md:w-1/2 md:p-32 lg:w-5/12">
      <div :class="headerPadding">
        <slot name="header">
          <div class="flex justify-between">
            <button v-show="backEnabled" type="button" class="flex items-center" @click="$emit('go-back')">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99316 9.9873L1.98621 5.98035L5.99316 1.97339"
                  stroke="#16192C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <span class="text-14 ml-16 font-semibold" @click="$emit('go-back')">Назад</span>
            </button>
            <slot name="header-center"></slot>
            <span class="text-32 ml-auto cursor-pointer font-normal after:content-['\00d7']" @click="$emit('close')"></span>
          </div>
        </slot>
      </div>
      <div class="ml-auto mr-auto h-full w-full overflow-hidden">
        <slot name="right-side"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseModalFullScreen extends Vue {
  @Prop({ default: true })
  backEnabled: boolean;

  @Prop({ default: false })
  isPinnedHeader: boolean;

  get headerPadding() {
    return this.isPinnedHeader ? "mb-0" : "mb-20 md:mb-60";
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/_vue-js-modal.scss";
.v--modal-overlay {
  background: rgba(19, 19, 19, 0.3) !important;
}
</style>
