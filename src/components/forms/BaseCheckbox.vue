<template>
  <div class="relative flex items-center">
    <input
      type="checkbox"
      v-bind="$attrs"
      :checked="value"
      v-on="{
        ...$listeners,
        change: (event) => $emit('change', event.target.checked),
      }"
    />
    <label v-if="label" class="checkbox-label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from "nuxt-property-decorator";

@Component
export default class BaseCheckbox extends Vue {
  @Prop()
  label: string;

  @Model("change", { type: Boolean })
  readonly value!: boolean;
}
</script>

<style lang="scss">
input[type="checkbox"] {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #c9c9c9;
  border-radius: 1px;
  vertical-align: sub;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  outline: none;

  &:checked {
    background-color: #000000;
    border-color: #000000;
  }

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgNS41TDMuNDI4NjMgOEw4LjUgMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjQiLz4KPC9zdmc+Cg==");
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
}

.checkbox-label {
  padding: 0 18px;
  margin-left: 12px;
  user-select: none;
  cursor: pointer;
  font-size: 14px;
}
</style>
