<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class InfiniteScroll extends Vue {
  @Prop()
  options: {};

  defaultOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0,
  };

  observer = {
    observe(_target: Element) {},
    disconnect() {},
  };

  mounted() {
    this.observer = new IntersectionObserver(
      ([item], _observer) => {
        if (!!item && item.isIntersecting) {
          this.$emit("on-intersect");
        }
      },
      { ...this.defaultOptions, ...this.options }
    );
    this.observer.observe(this.$el);
  }

  destroyed() {
    this.observer.disconnect();
  }
}
</script>
