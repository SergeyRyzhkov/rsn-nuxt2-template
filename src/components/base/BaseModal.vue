<template>
  <div>
    <span
      v-if="closeEnabled"
      class="vue-dialog_close-button text-32 ml-auto cursor-pointer font-normal after:content-['\00d7']"
      @click="$emit('close')"
    ></span>
    <slot name="header">
      <div class="flex items-center justify-between">
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
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseModal extends Vue {
  @Prop({ default: true })
  backEnabled: boolean;

  @Prop({ default: true })
  closeEnabled: boolean;
}
</script>

<style lang="scss">
@import "~/assets/styles/_vue-js-modal.scss";
</style>
