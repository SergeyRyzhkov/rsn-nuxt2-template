import Vue from "vue";
import { observe } from "../utils/LazyLoad";
import ImaskDirective from "./vue-imask-directive";

const ClickOutsideDirective = {
  onClickHandler(e, el, callback) {
    const elem = e.target as HTMLElement;
    if (!!callback && callback instanceof Function && elem.id !== "dont_outside" && !elem.classList.contains("dont_outside")) {
      if (!el.contains(elem)) {
        e.stopPropagation();
        callback.call(e);
      }
    }
  },

  inserted(el, binding) {
    document.body.addEventListener("click", (e) => ClickOutsideDirective.onClickHandler(e, el, binding.value));
  },

  unbind(el, binding) {
    document.body.removeEventListener("click", (e) => ClickOutsideDirective.onClickHandler(e, el, binding.value));
  },
};
// el.$destroy = () => el.removeEventListener

const LazySrc = {
  bind(el, binding) {
    // el.decoding = "async";
    if (el.setAttribute) {
      if (!el.getAttribute("alt")) {
        el.setAttribute("alt", " ");
      }
      if (!el.getAttribute("data-src")) {
        el.setAttribute("data-src", binding.value);
      }
    }
    observe(el);
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      el.setAttribute("data-src", binding.value);
      el.setAttribute("src", binding.value);
    }
  },
};

Vue.directive("lazysrc", LazySrc);
Vue.directive("imask", ImaskDirective);
Vue.directive("click-outside", ClickOutsideDirective);
