<template>
  <div>
    <label class="radio">
      <input
        type="radio"
        :name="name"
        class="hidden"
        v-bind="$attrs"
        :value="value"
        :checked="isChecked"
        v-on="{
          ...$listeners,
          change: (event) => $emit('change', event.target.value),
        }"
      />
      <span class="label"></span>{{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from "nuxt-property-decorator";
@Component
export default class BaseRadioButton extends Vue {
  @Prop()
  label: string;

  @Prop()
  name: string;

  @Prop()
  value: string | number;

  @Model("change")
  readonly modelValue!: string | number;

  get isChecked() {
    return this.modelValue === this.value;
  }
}
</script>

<style lang="scss">
.radio {
  position: relative;
  cursor: pointer;
  line-height: 20px;
  font-size: 14px;
  .label {
    position: relative;
    display: block;
    float: left;
    margin-right: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid #c9c9c9;
    border-radius: 100%;
    -webkit-tap-highlight-color: transparent;
    &:after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background: $secondary;
      transform: scale(0);
      transition: all 0.2s ease;
      opacity: 0.08;
      pointer-events: none;
    }
    &:hover {
      .label:after {
        transform: scale(3.6);
      }
    }
  }
}
input[type="radio"]:checked + .label {
  border-color: #c9c9c9;
  &:after {
    transform: scale(1);
    transition: all 0.2s cubic-bezier(0.35, 0.9, 0.4, 0.9);
    opacity: 1;
  }
}
</style>
