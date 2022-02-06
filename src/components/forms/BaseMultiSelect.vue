<template>
  <div class="base-multiselect">
    <multiselect
      :classes="classes"
      v-bind="{ ...$attrs, ...defaultOptions }"
      :options="selectOptions"
      v-on="{
        ...$listeners,
      }"
    >
    </multiselect>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
const multiselect = () => import("vue-multiselect/src/Multiselect.vue");

@Component({ components: { multiselect }, inheritAttrs: false })
export default class BaseMultiSelect extends Vue {
  inheritAttrs: false;

  @Prop()
  classes;

  @Prop()
  options: [];

  defaultOptions = {
    options: [{ id: 1000, name: "Другое" }],
    searchable: false,
    "close-on-select": true,
    "show-labels": false,
    "internal-search": false,
    "clear-on-select": false,
    "track-by": "id",
    label: "name",
  };

  get selectOptions() {
    return [...this.options, ...this.defaultOptions.options];
  }
}
</script>

<style lang="scss">
.base-multiselect {
  width: 100%;
  .multiselect {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    min-height: 32px;
    cursor: pointer;

    // color: #16192c;

    .multiselect__content-wrapper {
      z-index: 999999;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
    }

    .multiselect__input {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #16192c;
    }

    .multiselect__select {
      z-index: 999999;
      padding: 0px;
      height: 10px;
      min-height: 24px;
      width: 14px;
    }
    .multiselect__tags {
      color: $primary;
      border: none;
      border-bottom: 1px solid #c9c9c9;
      min-height: 32px;
      padding: 0px;
      border-radius: 0px;
      .multiselect__single {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        padding: 0px;
        margin: 0px;
        padding-left: 8px;
        vertical-align: middle;
      }
      .multiselect__placeholder {
        opacity: 1;
        color: $gray;
        padding: 0px;
        margin-bottom: 8px;
      }
    }
    .multiselect__option--highlight {
      background: none;
      outline: none;
      color: $secondary;
    }

    .multiselect__option--disabled {
      background: #ededed80 !important;
      cursor: text;
      pointer-events: none;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      color: inherit !important;
    }
  }
}
</style>
