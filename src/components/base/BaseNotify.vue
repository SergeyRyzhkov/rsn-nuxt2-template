<template>
  <div class="text-14 my-auto p-16 font-semibold">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class BaseNotify extends Vue {
  @Prop({ default: "Выполнено !" })
  text: string;

  @Prop({ default: true })
  autoClose: boolean;

  @Prop({ default: 2200 })
  closeInterval: number;

  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.$emit("close");
      }, this.closeInterval);
    }
  }
}
</script>
