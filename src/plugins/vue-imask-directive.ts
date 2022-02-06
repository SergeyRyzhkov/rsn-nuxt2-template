import IMask from "imask";

export default {
  bind: (el, _binding, _vnode) => {
    if (!!_binding?.value?.mask) {
      initMask(el, _binding.value);
    }
  },

  update: (el, _binding, _vnode) => {
    if (!!_binding?.value?.mask) {
      if (!!el.maskRef) {
        el.maskRef.updateOptions(_binding.value);
        if (el.value !== el.maskRef.value) el.maskRef._onChange();
      } else initMask(el, _binding.value);
    } else {
      destroyMask(el);
    }
  },

  unbind: (el) => {
    destroyMask(el);
  },
};

const initMask = (el, opts) => {
  el.maskRef = IMask(el, opts)
    .on("accept", () => fireEvent(el, "accept", el.maskRef))
    .on("complete", () => fireEvent(el, "complete", el.maskRef));
};

const fireEvent = (el, eventName, data) => {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(eventName, true, true, data);
  el.dispatchEvent(e);
};

const destroyMask = (el) => {
  if (el.maskRef) {
    el.maskRef.destroy();
    delete el.maskRef;
  }
};
