<template>
  <div class="base-input" :class="{ 'base-input--error': isShakeError && hasError }">
    <label v-if="!!label" class="base-input__label">{{ label }}</label>
    <input
      ref="maskFiled"
      v-imask="mask"
      :value="value"
      :class="[currentClasses, 'base-input__input', classes, type === 'password' ? 'md:pr-30 pr-16' : '']"
      :type="type === 'password' && showPassword ? '' : type"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        input: (event) => onInput(event),
      }"
      @keyup.delete="onDelete"
      @complete="onComplete"
    />

    <a v-if="type === 'password'" href="#" class="z-100 absolute top-0 right-0" @click.prevent="showPassword = !showPassword">
      <img v-show="showPassword" src="/icons/eye-open.svg" width="32" height="32" />
      <img v-show="!showPassword" src="/icons/eye-close.svg" width="32" height="32" />
    </a>

    <svg
      v-if="type === 'search'"
      class="base-input_search_icon"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.4298" cy="11" r="6.575" transform="rotate(-45 10.4298 11)" stroke="#16192C" stroke-width="1.6" />
      <path d="M15.1144 15.6846L18.9151 19.4853" stroke="#16192C" stroke-width="1.6" />
    </svg>

    <slot />

    <transition name="fade">
      <div v-if="!!help" class="base-input__help">{{ help }}</div>
    </transition>
    <transition name="fade">
      <div v-if="hasError">
        {{ errorText }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "nuxt-property-decorator";

type InputType = "text" | "number" | "tel" | "email" | "password" | "find" | "select" | "checkbox" | "search";

@Component({
  inheritAttrs: false,
})
export default class BaseInput extends Vue {
  showPassword = false;
  @Ref("maskFiled") readonly maskFiled!: HTMLInputElement | any;

  @Prop({ default: "" })
  mask: string;

  @Prop({ default: true })
  triggerOnlyValidMaskValue: boolean;

  @Prop({ default: "text" })
  type: InputType;

  @Prop()
  value;

  @Prop({ default: true })
  isShakeError: boolean;

  @Prop()
  label: string;

  @Prop()
  help: string;

  @Prop()
  classes: string;

  @Prop()
  errorText: string;

  @Prop({ default: false })
  hasError: boolean;

  async mounted() {
    await this.$nextTick();
    if (this.value) {
      if (!!this.maskFiled?.maskRef) {
        this.maskFiled.maskRef.typedValue = String(this.value);
        this.maskFiled.maskRef.unmaskedValue = String(this.value);
      }
    }
  }

  async onInput(e) {
    if (!this.maskFiled?.maskRef) {
      this.$emit("input", e.target.value);
      return;
    }

    await this.$nextTick();
    if (!!this.maskFiled?.maskRef && !this.triggerOnlyValidMaskValue) {
      this.$emit("input", this.maskFiled.maskRef.unmaskedValue);
    }
  }

  async onDelete(e) {
    if (!!this.maskFiled?.maskRef && this.triggerOnlyValidMaskValue) {
      const prevValue = this.maskFiled.maskRef.value;
      const prevUnmaskedValue = this.maskFiled.maskRef.unmaskedValue;

      if (!!e?.target?.maskRef) {
        this.$emit("input", "");
      }

      await this.$nextTick();
      this.maskFiled.maskRef.value = prevValue;
      this.maskFiled.maskRef.unmaskedValue = prevUnmaskedValue;
    }
  }

  async onComplete() {
    await this.$nextTick();
    if (!!this.maskFiled?.maskRef) {
      this.$emit("input", this.maskFiled.maskRef.unmaskedValue);
    }
  }

  get currentClasses() {
    return {
      "base-input__input--error": this.hasError,
      "base-input__input--help": !!this.help,
    };
  }

  destroyed() {
    if (!!this.maskFiled?.maskRef) {
      this.maskFiled.maskRef.destroy();
      delete this.maskFiled.maskRef;
    }
  }
}
</script>

<style lang="scss">
.base-input {
  position: relative;
  width: 100%;
  height: max-content;

  &__wrap {
    position: relative;
  }

  &--error {
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
  }

  &__input {
    border-bottom: 1px solid #c9c9c9;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 8px;
    &--error {
      border-bottom: 1px solid $red;
    }
    &--help {
      border: 1px solid #3068f7;
    }
    &::placeholder {
      opacity: 1;
      color: $gray;
    }
    &:focus {
      border-bottom: 1px solid $primary;
      outline: none;
    }
  }

  &__label {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 10px;
    color: $gray;
  }

  &__help {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #3068f7;
    position: absolute;
    top: 4px;
    left: 0;
  }

  &__error {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $red;
    position: absolute;
    margin-top: 4px;
    left: 0;
  }

  &_search_icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 4px;
  }
}
@keyframes shakeError {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.375rem);
  }
  30% {
    transform: translateX(-0.375rem);
  }
  45% {
    transform: translateX(0.375rem);
  }
  60% {
    transform: translateX(-0.375rem);
  }
  75% {
    transform: translateX(0.375rem);
  }
  90% {
    transform: translateX(-0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
