<template>
  <div>
    <video v-lazysrc="src" v-bind="$attrs" :class="videoClasses" v-on="$listeners"></video>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({ inheritAttrs: false })
export default class BaseVideoPlayer extends Vue {
  @Prop()
  src: string;

  @Prop()
  videoClasses: string;
}
</script>
