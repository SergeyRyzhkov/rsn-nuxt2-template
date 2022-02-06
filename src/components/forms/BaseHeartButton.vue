<template>
  <button class="z-10" v-on="$listeners"><img :src="imageSrc" :width="width" :height="height" /></button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class BaseHeartButton extends Vue {
  @Prop({ default: 22 })
  width;

  @Prop({ default: 22 })
  height;

  @Prop({ default: false })
  isRed: boolean;

  get imageSrc() {
    return this.isRed ? "/icons/heart_red.svg" : "/icons/heart_black.svg";
  }
}
</script>
