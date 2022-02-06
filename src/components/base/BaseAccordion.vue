<template>
  <div class="base-accordion">
    <div class="text-18 flex cursor-pointer items-center justify-between font-semibold" @click="toogle()">
      <slot name="header"></slot>

      <svg
        v-if="isArrow"
        width="16"
        height="16"
        viewBox="0 0 11 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="{ 'base-accordion--open': isContentActive }"
      >
        <path
          d="M9.5293 4.11731L5.52234 8.12427L1.51538 4.11731"
          stroke="#131313"
          stroke-width="1.5"
          stroke-linecap="round"
        ></path>
      </svg>
      <template v-else>
        <span v-show="!isContentActive" class="text-34 font-normal">+</span>
        <span v-show="isContentActive" class="text-34 font-normal">-</span>
      </template>
    </div>
    <div class="base-accordion__content" :class="[isContentActive ? 'active' : '']">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BaseAccordion extends Vue {
  @Prop({ default: false })
  isArrow;

  isContentActive = false;

  toogle() {
    this.isContentActive = !this.isContentActive;
  }
}
</script>

<style lang="scss">
.base-accordion {
  border-bottom: 1px solid #c9c9c9;
  padding: 12px 0 12px 0;
  > span {
    transition: 0.2s;
    line-height: 0px;
    outline: none;
  }
  &__content {
    transition: 0.2s;
    max-height: 0px;
    overflow-y: auto;
    padding: 0px;
    &.active {
      max-height: 400px;
      padding-bottom: 8px;
    }
  }
  &--open {
    transform: rotate(180deg);
  }
}
</style>
